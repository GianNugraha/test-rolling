const { Gift, GiftRated, GiftRedeem, sequelize } = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
class GiftController {
  static async getAllGifts(req, res, next) {
    try {
      const { page, sort, stock } = req.query;
      const limit = 10;
      const offset = (+page - 1) * limit;
      if(stock == null){
        const gifts = await Gift.findAndCountAll({
          distinct: true,
          // raw: true,
          attributes: ["id", "typeName", "seriesName", "memory", "poins", "createdAt", "fileUrl", "fileId"],
          offset: offset,
          limit: limit,
          include: [
            {
              // required: false,
              model: GiftRated,
              attributes: ["rate"],
            },
          ],
          order: [["createdAt", sort]],
        });
      gifts.limit = limit;
      res.status(200).json(gifts);
      }
      else{
        const gifts = await Gift.findAndCountAll({
          distinct: true,
          // raw: true,
          // 
          attributes: ["id", "typeName", "seriesName", "memory", "poins", "fileUrl", "createdAt"],
          offset: offset,
          limit: limit,
          include: [
            {
              model: GiftRated,
              attributes: ["rate"],
            },
          ],
          where: {
            stock: {
            [Op.gt]: stock,
          }
        },
          order: [["createdAt", sort]],
        });

      gifts.limit = limit;
      res.status(200).json(gifts);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getAllGiftAvailables(req, res, next) {
    try {
      const { page, sort } = req.query;
      // const { page } = req.params;
      const limit = 10;
      const offset = (+page - 1) * limit;
      
      const gifts = await Gift.findAndCountAll({
        distinct: true,
        // raw: true,
        attributes: ["id", "fileUrl", "typeName", "seriesName", "memory", "poins", "createdAt"],
        offset: offset,
        limit: limit,
        include: [
          {
            // required: false,
            model: GiftRated,
            attributes: ["rate"],
          },
        ],
        where: {
          [Op.gt]: 6,
        },
        order: [["createdAt", sort]],
      });

      gifts.limit = limit;
      res.status(200).json(gifts);
    } catch (error) {
      next(error);
    }
  }

  static async getOneGift(req, res, next) {
    try {
      const { giftId } = req.params;

      const gift = await Gift.findOne({
        attributes: [
          "typeName",
          "fileUrl",
          "seriesName",
          "memory",
          "poins",
          "stock",
          "resolution",
          "operationSystem",
          "createdAt",
        ],
        include: [
          {
            // required: false,
            model: GiftRated,
          },
        ],
        where: { id: giftId },
      });
      if (!gift) {
        throw { message: "Gift Not Found" };
      }
      res.status(200).json(gift);
    } catch (error) {
      next(error);
    }
  }

  static async addNewGifts(req, res, next) {
    try {
      const {
        // test
        typeName,
        seriesName,
        resolution,
        memory,
        operationSystem,
        stock,
        poins,
        fileUrl,
        fileId,
        fileType
      } = req.body;
      if(!fileUrl || !fileId || !fileType || !typeName || !seriesName || !resolution || !memory || !operationSystem || !stock || !poins ){ 
        throw { message: "badRequest - Add New Gift Type" };
      }

      const newGift = await Gift.create(
        {
          id: uuidv4(),
          typeName,
          seriesName,
          resolution,
          memory,
          operationSystem,
          stock,
          poins,
          fileId,
          fileType,
          fileUrl
        },
        { returning: true }
      );
      if (!newGift) {
        throw { message: "Failed to Add Gift Type" };
      }
      res.status(201).json(newGift);
    } catch (error) {
      next(error);
    }
  }

  // Reedem
  static async addRedeemGift(req, res, next) {
    try {
      const { giftId } = req.params;

      const userId = req.user.id;
      if (!giftId || !userId) {
        throw { message: "badRequest - Add New Gift Redeem" };
      }
      const newGiftRedeem = await GiftRedeem.create(
        {
          id: uuidv4(),
          userId,
          GiftId: giftId
        },
        { returning: true }
      );
      if (!newGiftRedeem) {
        throw { message: "Failed to Add Gift Redeem" };
      }
      res.status(201).json(newGiftRedeem);
    } catch (error) {
      next(error);
    }
  }

  // Rating
  static async addRatingGift(req, res, next) {
    try {
      const { giftId } = req.params;

      const { GiftRedeemId, rate } = req.body;
      const userId = req.user.id;
      if (!giftId || !GiftRedeemId || !userId || !rate || rate < 0.5 || rate > 5) {
        throw { message: "badRequest - Add New Gift Rating" };
      }
      const newGiftRating = await GiftRated.create(
        {
          id: uuidv4(),
          GiftId: giftId,
          GiftRedeemId,
          userId,
          rate: Math.round(rate),
        },
        { returning: true }
      );
      if (!newGiftRating) {
        throw { message: "Failed to Add Gift Rating" };
      }
      res.status(201).json(newGiftRating);
    } catch (error) {
      next(error);
    }
  }

  static async getGiftRating(req, res, next) {
    try {
      const { giftId } = req.params;

      const giftrated = await GiftRated.findAndCountAll({
        distinct: true,
        where: { GiftId: giftId },
        include: [{ model: Gift }],
      });
      if (!giftrated) {
        throw { message: "Gift Rated Not Found" };
      }
      res.status(200).json(giftrated);
    } catch (error) {
      next(error);
    }
  }

  static async updateGift(req, res, next) {
    const {id} = req.params;
    try {
      const dataGift = await Gift.update(
        req.body,  
        {
          where: { id },
          returning: true }
      );
      if (!dataGift) {
        throw { message: "Failed to Update Gift" };
      }
      res.status(201).json(dataGift);
    } catch (error) {
      next(error);
    }
  }

  static async deleteGift(req, res, next) {
    const { id } = req.params;
    let transaction = await sequelize.transaction();
    try {
      // delete gift redeem with id gift
      const deleteGiftRedeem = await GiftRedeem.destroy({
        where: { GiftId: id },
      });

      // delete gift rated with id gift
      const deleteGiftRated = await GiftRated.destroy({
        where: { GiftId: id },
      });

      // delete gift
      const deleteGift = await Gift.destroy({
        where: { id },
      });

      if (!deleteGift) {
        throw { message: "Failed to Delete Gift" };
      }

      // await transaction.commit();
      res.json({
        message: "Delete Successfuly",
      });
      res.status(201).json(deleteGift);
    } catch (error) {
      // await transaction.rollback();
      next(error);
    }
  }

  static async patchData(req, res, next) {
    try {
      const { id } = req.params;
      const {
        typeName,
        seriesName,
        resolution,
        memory,
        operationSystem,
        stock,
        poins,
      } = req.body;
      const data = {
        typeName,
        seriesName,
        resolution,
        memory,
        operationSystem,
        stock,
        poins,
      };
      const newData = {};

      for (const key in data) {
        if (!data[key]) {
          continue;
        } else {
          newData[key] = data[key];
        }
      }

      const getDataGift = await Gift.findOne({
        where: { id },
        returning: true,
      });

      if (getDataGift && getDataGift.id == id) {
        const dataGift = await Gift.update(newData, {
          where: { id },
          returning: true,
        });

        res.status(200).json({
          message: "Data Hasbeen Updated",
          updatedData: newData,
        });
      } else {
        res.status(404).json({
          message: "Id Gift Not Found",
        });
        // throw {message: "Id Acquisition not found "}
      }
      if (!dataGift[0] === 0) {
        throw { message: "Data Gift Not Found" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GiftController;
