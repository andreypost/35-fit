import { rateLimit } from "express-rate-limit";
import { msg } from "../constants/messages";

export const rateLimitHandler = (
  time: number,
  limit: number,
  message: string
) => {
  return rateLimit({
    windowMs: time,
    max: limit,
    standardHeaders: "draft-8",
    message: {
      success: false,
      message: `${message} ${time / 60000} minutes`,
    },
  });
};

export const globalLimiter = rateLimitHandler(
  15 * 60 * 1000, // 15 minutes
  200,
  msg.TOO_MANY_REQUESTS
);

export const fileWriteLimiter = rateLimitHandler(
  60 * 60 * 1000, // 60 minutes
  200,
  msg.TOO_MANY_REQUESTS
);
