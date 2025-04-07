import { body } from "express-validator";
import { msg } from "../constants/messages";

export const validateEmailPasswordDto = [
  body("email").isEmail().withMessage(msg.VALID_EMAIL_IS_REQUIRED),
  body("password")
    .isLength({ min: 4 })
    .withMessage(msg.PASSWORD_MUTS_BE_AT_LEAST),
];
