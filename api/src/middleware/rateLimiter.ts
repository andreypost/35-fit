import { rateLimit } from "express-rate-limit";
import { msg } from "../constants/messages";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per `window` per 15 mins
  message: { success: false, message: msg.TOO_MANY_LOGIN_ATTEMPTS },
  statusCode: 429,
  keyGenerator: (req: any) => req.ip,
});
