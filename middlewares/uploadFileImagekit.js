const axios = require("axios");
const FormData = require("form-data");
const { Gift } = require("../models");
async function uploadFileImagekit(req, res, next) {
    try {
      if (!req.file) {
        throw { message: `badRequest-UploadFile` };
      }
      const file = new FormData();
      file.append("fileName", req.file.originalname);
      file.append("file", req.file.buffer.toString("base64"));
      file.append("folder", `rolling/gift`);
      const uploadFileImagekit = await axios({
        method: "post",
        url: "https://upload.imagekit.io/api/v1/files/upload",
        data: file,
        headers: { ...file.getHeaders() },
        auth: {
          username: process.env.IMAGEKIT_PRIVATEKEY,
        },
      });
      req.body.fileUrl = uploadFileImagekit.data.url;
      req.body.fileId = uploadFileImagekit.data.fileId;
      req.body.fileType = uploadFileImagekit.data.fileType;
      next();
    } catch (error) {
      next(error);
    }
  }
  module.exports = uploadFileImagekit;