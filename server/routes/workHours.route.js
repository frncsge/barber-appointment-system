import express from "express";
import {
  addWorkHours,
  getWorkHours,
} from "../controllers/workHours.controller.js";
import { getAvailableTimeSlots } from "../controllers/workHours.controller.js";

const router = express.Router();

router.post("/work-hours", addWorkHours);
router.get("/work-hours/:date", getWorkHours);
router.get("/work-hours/:date/time-slots", getAvailableTimeSlots);

export default router;
