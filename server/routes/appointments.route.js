import express from "express";
import {
  bookAppointment,
  getAppointments,
} from "../controllers/appointments.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

// for getting all appointments or by a specific date
router.get("/appointments", authenticateUser, getAppointments);

// for customers to book an appointment on a specific date
router.post("/barbers/:id/appointments", bookAppointment);

export default router;
