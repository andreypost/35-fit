import { body } from "express-validator";
import { msg } from "../../constants/messages";

export const validateScooterDto = [
  body("model")
    .notEmpty()
    .withMessage(msg.SCOOTER_MODEL_IS_REQUIRED)
    .isString()
    .withMessage(`Model Name ${msg.MUST_BE_STRING}`),
  body("priceId").isUUID().withMessage(msg.ID_MUST_BE_UUID),
  body("rentalPricePerDay")
    .optional()
    .isInt({ min: 0 })
    .withMessage(`Rental price per day ${msg.MUST_BE_NUMBER}`),
  body("saleType")
    .default("sale")
    .optional()
    .isIn(["sale", "rental"])
    .withMessage("Scooter sale type must be one of: Sale or Rental"),
];
