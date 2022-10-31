const { User, sequelize, Registration } = require("../models");
const bcrypt = require("bcrypt");
require("dotenv").config();
const secretkey = process.env.SECRETKEY;
const { NotFoundError, ValidationError } = require("../helpers/errorHandler");
const jwt = require("jsonwebtoken");
const mail = require("../helpers/mailHandler");
const hashPassword = require("../helpers/hashPassword");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

class UserController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw { message: "badRequest-login" };
      } else {
        const user = await User.findOne({ where: { username }, raw: true });
        if (!user) {
          throw { message: "notFound-login" };
        } else {
          const bcryptPass = await  bcrypt.compareSync(password, user.password);
          if (!bcryptPass) {
            throw { message: "forbidden-login" };
          } else {
            //kirim token
            const access_token = jwt.sign(user, secretkey);
            res.status(200).json({
              access_token: access_token,
              data: user,
            });
          }
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    const transaction = await sequelize.transaction();
    try {
      const { username, email, password, confirmPassword } = req.body;

      if (!username || !email || !password || !confirmPassword) {
        throw { message: "badRequest - Data Harus di isi semua" };
      }
      if (req.body.password != req.body.confirmPassword)
        throw new NotFoundError(
          "Password dan konfirmasi password tidak sama",
          1
        );

      let cekEmail = await User.findAll({
        where: {
          email,
        },
      });

      if (cekEmail == "") {
        try {
          let user = await User.create({
            id: uuidv4(),
            username: username,
            email: email,
            password: password,
            isActive: true,
            role: "admin",
            isVerifiedEmail: true,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          // createdAt : moment(new Date()).format('YYYY-MM-DD HH:mm:ss')

          const idUser = user.dataValues.id;

          let code = `${Math.floor(Math.random() * 999999)}`;
          await Registration.create({
            id: uuidv4(),
            user_id: idUser,
            access_code: code,
            email: email,
            valid_until: moment(new Date())
              .add(5, "minutes")
              .format("YYYY-MM-DD HH:mm:ss"),
            created_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            updated_at: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          });

          await mail.sendMailVerification(email, code);
          await transaction.commit();
          res
            .status(200)
            .json(
              "Registrasi Sukses !, Kode OTP telah dikirim ke email yang di daftarkan"
            );
        } catch (e) {
          throw e;
        }
      } else {
        throw { message: "badRequest - Email Sudah Terdaftar" };
      }
    } catch (e) {
      await transaction.rollback();
      next(e);
    }
  }

  static async verifikasi(req, res, next) {
    try {
      const { email, access_code } = req.body;

      if (!email || !access_code) {
        throw { message: "badRequest - Data Harus di isi semua" };
      }

      let cekEmail = await User.findOne({
        where: { email },
      });

      if (cekEmail == null) {
        throw { message: "badRequest - Email Tidak Terdaftar" };
      }

      if (cekEmail.isVerifiedEmail)
        throw { message: "Email sudah diverifikasi, silahkan login." };
      let cekAccess = await Registration.findOne({
        where: { email, access_code },
      });

      if (cekAccess == null)
        throw {
          message:
            "Kode akses salah, silahkan cek email atau lakukan verifikasi ulang.",
        };
      if (
        moment(new Date()).format("YYYY-MM-DD HH:mm:ss") >=
        cekAccess.valid_until
      )
        throw { message: "Kode Verifikasi Telah Expired" };

      // console.log(cekEmail.id,`ini data email`)
      const idUser = cekEmail.id;
      await User.update(
        {
          updatedAt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
          isVerifiedEmail: true,
          isActive: true,
        },
        { where: { id: idUser } }
      );

      res
        .status(200)
        .json(
          "Verifikasi Sukses !, Silahkan Login"
        );
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UserController;
