import { body } from "express-validator";
import { msg } from "../../constants/messages";

export const validateFileWrite = [
  body("id").isInt({ min: 1 }).withMessage(msg.ID_IS_REQUIRED),
  body("earnings").notEmpty().withMessage(msg.EARNINGS_IS_REQUIRED),
  body("country").notEmpty().withMessage(msg.COUNTRY_IS_REQUIRED),
  body("name").notEmpty().withMessage(msg.NAME_IS_REQUIRED),
];
