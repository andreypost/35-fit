import { body } from "express-validator";
import { msg } from "../../constants/messages";

export const validateAccessoryDto = [
  body("name")
    .notEmpty()
    .withMessage(msg.ACCESSORY_NAME_IS_REQUIRED)
    .isString()
    .withMessage(msg.MUST_BE_STRING),
  body("priceId").isUUID().withMessage(msg.ID_MUST_BE_UUID),
];
