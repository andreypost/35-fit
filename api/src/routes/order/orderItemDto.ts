import { body } from "express-validator";

export const validateOrderItemDto = [
  body("productType")
    .isIn(["scooter", "accessory"])
    .withMessage(
      "'Order Product Type is required and must be either scooter or accessory'"
    ),

  body("productId")
    .isUUID()
    .withMessage("Order Product ID is required and must be a valid UUID"),

  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Order Quantity must be a number and at least 1"),
];
