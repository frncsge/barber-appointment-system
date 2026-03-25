import express from "express";
import {
  addWorkHours,
  getWorkHours,
} from "../controllers/workHours.controller.js";

const router = express.Router();

router.post("/work-hours", addWorkHours);
router.get("/work-hours/:date", getWorkHours);

export default router;
