import express from "express";
import { bookAppointment } from "../controllers/appointments.controller.js";

const router = express.Router();

// for customers to book an appointment on a specific date
router.post("/barbers/:id/appointments", bookAppointment);

export default router;
