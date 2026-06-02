const express = require("express");

const router = express.Router();

const {
  createInterview,
  getMyInterviews,
  getInterviews,
  submitInterview,
  evaluateInterview,
} = require(
  "../controllers/interviewController"
);

const {
  protect,
} = require("../middleware/authMiddleware");

router.post("/", protect, createInterview);

router.get("/", protect, getInterviews);

router.get(
  "/my-interviews",
  protect,
  getMyInterviews
);

router.post(
  "/evaluate",
  protect,
  evaluateInterview
);

router.put(
  "/:id/submit",
  protect,
  submitInterview
);

module.exports = router;