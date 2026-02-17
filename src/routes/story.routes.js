const { storyController } = require("../controllers/story.controller");
const express = require("express");
const { upload } = require("../middleware/multer");
const validate = require("../middleware/validate");
const { apiLimiter } = require("../middleware/rateLimiter");
const { storyValidations } = require("../validations/story.validations");

const router = express.Router();

router.post(
  "/stories",
  apiLimiter,
  storyValidations.createStoriesValidations,
  validate,
  upload.array("images", 10),
  storyController.createStories,
);
router.get("/stories", storyController.getAllStories);
router.put(
  "/stories/:id",
  apiLimiter,
  storyValidations.updateStoriesValidation,
  validate,
  storyController.updateStories,
);
router.delete(
  "/stories/:id",
  apiLimiter,
  storyValidations.deleteStoriedValidation,
  validate,
  storyController.deleteStories,
);

module.exports = router;
