import { rateLimit } from "express-rate-limit";
import { msg } from "../constants/messages";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per `window` per 15 mins
  message: msg.TOO_MANY_LOGIN_ATTEMPTS,
  handler: (req, res, next, options) => {
    throw new Error(msg.TOO_MANY_LOGIN_ATTEMPTS);
  },
  keyGenerator: (req: any) => req.ip,
});
