import redisClient from "../../config/redisConfig.js";

// returns true if limit haven't reached yet
export const checkRateLimit = async (rateLimits = [], window) => {
  try {
    if (!rateLimits || rateLimits.length === 0) return;

    const results = await Promise.all(
      rateLimits.map(async (rateLimit) => {
        const count = await redisClient.incr(rateLimit.key);

        if (count === 1) await redisClient.expire(rateLimit.key, window);

        return { ...rateLimit, count };
      }),
    );

    const exceeded = results.some(
      ({ count, maxAttempts }) => count > maxAttempts,
    );

    if (exceeded) return false;

    return true;
  } catch (error) {
    console.error("Rate limit error:", error);
    throw error;
  }
};
