const { storyController } = require("../controllers/story.controller");
const express = require("express");
const { upload } = require("../middleware/multer");
const validate = require("../middleware/validate");
const { apiLimiter } = require("../middleware/rateLimiter");
const { storyValidations } = require("../validations/story.validations");
const { useAuth } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/stories",
  apiLimiter,
  useAuth,
  upload.array("images", 10),
  storyValidations.createStoriesValidations,
  validate,
  storyController.createStories,
);
router.get("/stories", useAuth, storyController.getAllStories);
router.get("/stories/:id", useAuth, storyController.getStoryById);
router.put(
  "/stories/:id",
  apiLimiter,
  useAuth,
  upload.array("images", 10),
  storyValidations.updateStoriesValidation,
  validate,
  storyController.updateStories,
);
router.delete(
  "/stories/:id",
  apiLimiter,
  useAuth,
  storyValidations.deleteStoriedValidation,
  validate,
  storyController.deleteStories,
);

module.exports = router;
