import { body, query } from "express-validator";
import { msg } from "../../constants/messages";

export const validatePriceNameQueryDto = [
  query("priceName")
    .notEmpty()
    .isString()
    .withMessage(msg.PRICE_NAME_IS_REQUIRED),
];

export const validatePriceDto = [
  body("name").notEmpty().isString().withMessage(msg.PRICE_NAME_IS_REQUIRED),
  body("amount")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage(msg.PRICE_AMOUNT_IS_REQUIRED),
  body("discount").optional().isInt({ min: 0, max: 100 }),
  body("taxRate").optional().isInt({ min: 0, max: 100 }),
  body("currency").notEmpty().isString().isLength({ min: 3, max: 3 }),
  body("productType")
    .notEmpty()
    .withMessage("Price Product Type is required")
    .isString()
    .withMessage("Price Product Type must be a string")
    .isIn(["scooter", "accessory"])
    .withMessage("Price Product Type must be Scooter, Accessory"),
];
