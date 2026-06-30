import express from "express";
import {
  addWorkHours,
  getWorkHours,
  getAvailableTimeSlots,
  updateWorkHours,
  deleteWorkHours,
} from "../controllers/workHours.controller.js";
import {
  addUnavailableTimeSlot,
  removeUnavailableTimeSlot,
  getUnavailableTimeSlot,
} from "../controllers/unavailableTimeSlots.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

// for barber's to add their work hours
router.post("/work-hours", authenticateUser, addWorkHours);

// for barber's to mark their time slots as unavailable
router.post(
  "/work-hours/:date/unavailable-time-slots",
  authenticateUser,
  addUnavailableTimeSlot,
);

router.get(
  "/unavailable-time-slots",
  authenticateUser,
  getUnavailableTimeSlot,
);

// for viewing a barber's work hours on a specific date
router.get("/barbers/:id/work-hours", getWorkHours);

// for viewing a barber's available time slots
router.get("/barbers/:id/time-slots", getAvailableTimeSlots);

// for barbers to update their work hours on a specific date
router.patch("/work-hours", authenticateUser, updateWorkHours);

// for barbers to delete work hours on a specific date
router.delete("/work-hours/:id", authenticateUser, deleteWorkHours);

// for barbers to delete or make an unavailable time slot available again
router.delete(
  "/work-hours/:date/unavailable-time-slots",
  authenticateUser,
  removeUnavailableTimeSlot,
);

export default router;
