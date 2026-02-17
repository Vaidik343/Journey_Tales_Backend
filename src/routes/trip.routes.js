const { tripController } = require("../controllers/trip.controller");
const express = require("express");
const { upload } = require("../middleware/multer");
const { tripValidations } = require("../validations/trips.validations");
const { apiLimiter } = require("../middleware/rateLimiter");
const validate = require("../middleware/validate");
const router = express.Router();

router.post(
  "/trip",
  apiLimiter,
  tripValidations.createTripValidations,
  validate,
  upload.single("coverImage"),
  tripController.createTrip,
);
router.get("/trip", tripController.getAllTrip);
router.put(
  "/trip/:id",
  apiLimiter,
  tripValidations.updateTripValidations,
  validate,
  tripController.updateTrip,
);
router.delete(
  "/trip/:id",
  apiLimiter,
  tripValidations.deleteTripValidation,
  validate,
  tripController.deleteTrip,
);

module.exports = router;
