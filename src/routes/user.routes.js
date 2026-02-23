const { userController } = require("../controllers/user.controller");
const express = require("express");
const validate = require("../middleware/validate");
const { usersValidation } = require("../validations/users.validations");
const { apiLimiter, authLimiter } = require("../middleware/rateLimiter");
const { useAuth } = require("../middleware/auth");
const router = express.Router();

router.post("/user/login", authLimiter, userController.login )
router.post("/user/logout", authLimiter, userController.logout )
router.get("/user/refresh", userController.refreshToken)


router.post(
  "/me",
  apiLimiter,
  usersValidation.createUserValidation,
  validate,
  userController.createUser,
);

router.get("/user", apiLimiter,  userController.getAllUser);
router.get("/me/:id", apiLimiter, useAuth, userController.getUserById);
router.put(
  "/me/:id",
  apiLimiter,
  useAuth,
  usersValidation.updateUserValidation,
  validate,
  userController.updateUser,
); 
router.delete(
  "/me/:id",
  apiLimiter,
  useAuth,
  usersValidation.deleteUserValidation,
  validate,
  userController.deleteUser,
);



console.log("apiLimiter:", apiLimiter);
console.log("login:", userController.login);

module.exports = router;
