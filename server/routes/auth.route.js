import express from "express";
import {
  logIn,
  refresh,
  logOut,
  register,
  verify,
  sendVerification,
  sendPasswordResetOtp,
  verifyPasswordResetOtp,
  resetPassword,
  getMe,
} from "../controllers/auth.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", authenticateUser, getMe);

router.post("/register", register);
router.post("/log-in", logIn);
router.post("/log-out", logOut);
router.post("/refresh", refresh);
router.post("/email-verifications", sendVerification);
router.post("/password-resets", sendPasswordResetOtp);
router.post("/password-resets/verify", verifyPasswordResetOtp);
router.post("/password-resets/confirm", resetPassword);

router.get("/email-verifications", verify);

export default router;
