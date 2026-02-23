const { wishlistController } = require("../controllers/wishList.controller");
const express = require("express");

const { wishlistValidations } = require("../validations/wishlist.validations");
const validate = require("../middleware/validate");
const { apiLimiter } = require("../middleware/rateLimiter");
const { useAuth } = require("../middleware/auth");
const router = express.Router();

router.post(
  "/wishlist",
  apiLimiter,
  useAuth,
  wishlistValidations.createWishListValidations,
  validate,
  wishlistController.createWishList,
);
router.get("/wishlist", useAuth, wishlistController.getAllWishList);
router.get("/wishlist/:id", useAuth, wishlistController.getWishlistById);
router.put(
  "/wishlist/:id",
  apiLimiter,
  useAuth,
  wishlistValidations.updateWishListValidations,
  validate,
  wishlistController.updateWishlist,
);
router.delete(
  "/wishlist/:id",
  apiLimiter,
  useAuth,
  wishlistValidations.deleteWishListValidations,
  validate,
  wishlistController.deleteWishlist,
);

module.exports = router;
