import { body } from "express-validator";

export const validateOrderDto = [
  body("status")
    .isIn(["pending", "shipped", "delivered", "cancelled"])
    .withMessage(
      "Order Status is required and must be one of: pending, shipped, delivered, or cancelled"
    ),

  body("items")
    .isArray({ min: 1 })
    .withMessage("Order must include at least one item"),

  body("items.*.productType")
    .isIn(["scooter", "accessory"])
    .withMessage(
      "'Order Product Type is required and must be either scooter or accessory'"
    ),

  body("items.*.productId")
    .isUUID()
    .withMessage("Order Product ID is required and must be a valid UUID"),

  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Order Quantity must be a number and at least 1"),
];
