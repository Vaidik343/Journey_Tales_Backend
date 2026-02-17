const { userController } = require("../controllers/user.controller");
const express = require("express");
const validate = require("../middleware/validate");
const { usersValidation } = require("../validations/users.validations");
const { apiLimiter } = require("../middleware/rateLimiter");
const router = express.Router();

router.post(
  "/user",
  apiLimiter,
  usersValidation.createUserValidation,
  validate,
  userController.createUser,
);
router.get("/user", apiLimiter,validate, userController.getAllUser);
router.put(
  "/user/:id",
  apiLimiter,
  usersValidation.updateUserValidation,
  validate,
  userController.updateUser,
);
router.delete(
  "/user/:id",
  apiLimiter,
  usersValidation.deleteUserValidation,
  validate,
  userController.deleteUser,
);

module.exports = router;
