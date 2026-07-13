import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import workHoursRoutes from "./routes/workHours.route.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
import { globalRateLimit } from "./middlewares/rateLimit.middleware.js";
import appointmentsRoutes from "./routes/appointments.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.set("trust proxy", 1);

app.use(globalRateLimit);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", workHoursRoutes);
app.use("/api", appointmentsRoutes);

app.get("/", (req, res) => {
  res.send("barber-appointment-system server is running");
});

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
