import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { Order } from "../entities/Order";
import { deleteAuthToken, validateAuthToken } from "../auth/jsonWebToken";
import { orderRepository, userRepository } from "../config/database";
import { msg } from "../constants/messages";

export const order = Router();

order.post(
  "/create",
  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Order Quantity must be at least 1."),
  body("status")
    .isString()
    .isIn(["Pending", "Shipped", "Delivered", "Cancelled"])
    .withMessage(
      "Order status must be one of: Pending, Shipped, Delivered, Cancelled."
    ),
  body("totalCost")
    .isFloat({ min: 0 })
    .withMessage("Total Cost must be a positive value.")
    .custom((value) => {
      if (!/^\d+(\.00)?$/.test(value.toString())) {
        throw new Error("Total Cost must have up to 2 decimal places.");
      }
      return true;
    }),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Order | any> => {
    try {
      const err = validationResult(req);
      if (!err.isEmpty()) {
        return next({
          message: err.array(),
          status: 400,
          type: "ValidationDataError",
        });
      }
      const { authToken } = req?.cookies;
      const { email } = await validateAuthToken(authToken, res);
      const currentUser = await userRepository.findOne({
        where: { email },
      });

      if (!currentUser) {
        await deleteAuthToken(res);
        return next({
          message: msg.USER_NOT_FOUND,
          status: 404,
          type: "FindUserError",
        });
      }

      const { quantity, status, totalCost } = await req.body;

      const newOrder = orderRepository.create({
        quantity,
        status,
        totalCost,
        user: currentUser,
      });

      await orderRepository.save(newOrder);
      return res.status(200).json(newOrder);
    } catch (error: any) {
      next(error);
    }
  }
);

order.get(
  "/orders",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Order[] | any> => {
    try {
      const { authToken } = req?.cookies;
      const { email } = await validateAuthToken(authToken, res);
      const currentUser = await userRepository.findOne({
        where: { email },
      });

      if (!currentUser) {
        await deleteAuthToken(res);
        return next({
          message: msg.USER_NOT_FOUND,
          status: 404,
          type: "FindUserError",
        });
      }

      const orders = await orderRepository.find({
        where: { user: { id: currentUser.id } },
        relations: ["user"],
      });
      console.log(currentUser, orders);
      return res.status(200).json(orders);
    } catch (error: any) {
      next(error);
    }
  }
);
