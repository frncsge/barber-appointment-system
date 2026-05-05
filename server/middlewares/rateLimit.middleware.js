import { checkRateLimit } from "../utils/rateLimit.util.js";

export const globalRateLimit = async (req, res, next) => {
  try {
    const allowRequests = await checkRateLimit(
      [{ key: `rateLimit:global:ip:${req.ip}`, maxAttempts: 100 }],
      60,
    );

    if (!allowRequests) {
      return res.status(429).json({ message: "Too many request" });
    }

    next();
  } catch (error) {
    console.error("Global rate limit error:", error);
    next();
  }
};
