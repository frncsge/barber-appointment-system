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

// for viewing a barber's work hours on a specific date
router.get("/barbers/:id/work-hours/:date", getWorkHours);

// for viewing a barber's available time slots
router.get("/barbers/:id/work-hours/:date/time-slots", getAvailableTimeSlots);

// for barber's to update their work hours on a specific date
router.patch("/work-hours/:date", authenticateUser, updateWorkHours);

// for barber's to delete work hours on a specific date
router.delete("/work-hours/:date", authenticateUser, deleteWorkHours);

// for barber's to delete or make an unavailable time slot available again
router.delete(
  "/work-hours/:date/unavailable-time-slots",
  authenticateUser,
  removeUnavailableTimeSlot,
);

export default router;
