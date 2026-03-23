import express from "express";
import { addWorkHours } from "../controllers/workHours.controller.js";

const router = express.Router();

router.post("/work-hours", addWorkHours);

export default router;
