const express = require("express");
const GiftController = require("../controllers/GiftController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const uploadFileImagekit = require("../middlewares/uploadFileImagekit");
// const upload = require("../middlewares/uploadFile");
const multer = require("multer");
const upload = multer();
const router = express.Router();

router.post(
  "/:giftId/redeem",
  [authentication, authorization],
  GiftController.addRedeemGift
);

// rating
router.post(
  "/:giftId/rating",
  [authentication, authorization],
  GiftController.addRatingGift
);

router.get(
  "/:giftId/rating",
  [authentication],
  GiftController.getGiftRating
);

router.post(
  "/",
  [authentication, authorization, upload.single("file"), uploadFileImagekit],
  GiftController.addNewGifts
);

router.get(
  "/:giftId",
  [authentication],
  GiftController.getOneGift
);

router.get(
  "/",
  [authentication],
  GiftController.getAllGifts
);

router.patch(
  "/:id",
  [authentication, authorization],
  GiftController.patchData
);

router.put(
  "/:id",
  [authentication, authorization],
  GiftController.updateGift
);

router.delete(
  "/:id",
  [authentication, authorization],
  GiftController.deleteGift
);


module.exports = router;
