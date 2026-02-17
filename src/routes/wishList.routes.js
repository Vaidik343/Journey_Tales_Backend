const { wishlistController } = require("../controllers/wishList.controller");
const express = require("express");

const { wishlistValidations } = require("../validations/wishlist.validations");
const validate = require("../middleware/validate");
const { apiLimiter } = require("../middleware/rateLimiter");
const router = express.Router();

router.post(
  "/wishlist",
  apiLimiter,
  wishlistValidations.createWishListValidations,
  validate,
  wishlistController.createWishList,
);
router.get("/wishlist", wishlistController.getAllWishList);
router.put(
  "/wishlist/:id",
  apiLimiter,
  wishlistValidations.updateWishListValidations,
  validate,
  wishlistController.updateWishlist,
);
router.delete(
  "/wishlist/:id",
  apiLimiter,
  wishlistValidations.deleteWishListValidations,
  validate,
  wishlistController.deleteWishlist,
);

module.exports = router;
