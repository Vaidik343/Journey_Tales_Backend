const { tripController } = require("../controllers/trip.controller");
const express = require("express");
const { upload } = require("../middleware/multer");
const { tripValidations } = require("../validations/trips.validations");
const { apiLimiter } = require("../middleware/rateLimiter");
const validate = require("../middleware/validate");
const { useAuth } = require("../middleware/auth");
const router = express.Router();

router.post(
  "/trip",
  // apiLimiter,
  useAuth,
  upload.single("coverImage"),
  // tripValidations.createTripValidations,
  // validate, 
  tripController.createTrip,
);
router.get("/trip", useAuth, tripController.getAllTrip);
router.get("/trip/:id", useAuth, tripController.getTripById);
router.put(
  "/trip/:id",
  apiLimiter,
  useAuth,
  tripValidations.updateTripValidations,
  validate,
  tripController.updateTrip,
);
router.delete(
  "/trip/:id",
  apiLimiter,
  useAuth,
  tripValidations.deleteTripValidation,
  validate,
  tripController.deleteTrip,
);

module.exports = router;
