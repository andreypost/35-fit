import { NextFunction, Request, Response, Router } from "express";
import { param } from "express-validator";
import { validateAuthToken } from "../../auth/jsonWebToken";
import {
  accessoryRepository,
  orderItemRepository,
  orderRepository,
  scooterRepository,
  userRepository,
} from "../../config/database";
import { msg } from "../../constants/messages";
import { validateOrderDto } from "./orderDto";
import { errorValidationCheck } from "../../validators/errorValidationCheck";
import { Order } from "../../entities/Order";
import { Scooter } from "../../entities/Scooter";
import { Accessory } from "../../entities/Accessory";

export const order = Router();

order.post(
  "/create",
  validateOrderDto,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Order> | void> => {
    try {
      const isValid = errorValidationCheck(req, next);
      if (!isValid) return;

      const { authToken } = req?.cookies;
      const { email } = await validateAuthToken(authToken, res);

      const currentUser = await userRepository.findOne({ where: { email } });
      if (!currentUser) {
        return next({ message: msg.USER_NOT_FOUND });
      }

      const { status, items } = req?.body;

      const createOrderItems = async (
        productId: string,
        productType: string,
        quantity: number
      ): Promise<any> => {
        let product = null;
        if (productType === "scooter") {
          //   product = await scooterRepository.findOne({
          //     where: { id: productId },
          //     relations: ["price"],
          //   });

          product = await scooterRepository
            .createQueryBuilder("scooter")
            .leftJoinAndSelect("scooter.price", "price")
            .where("scooter.id = :id", { id: productId })
            .getOne();
        } else if (productType === "accessory") {
          //   product = await accessoryRepository.findOne({
          //     where: { id: productId },
          //     relations: ["price"],
          //   });

          product = await accessoryRepository
            .createQueryBuilder("accessory")
            .leftJoinAndSelect("accessory.price", "price")
            .where("accessory.id = :id", { id: productId })
            .getOne();
        }

        if (!product) {
          return next({ message: msg.ORDER_NOT_FOUND });
        }

        if (!product.price) {
          return next({
            message: `Product with ID ${productId} has no price assigned.`,
          });
        }

        return {
          price: product.price,
          productId: product.id,
          productName:
            productType === "scooter"
              ? (product as Scooter).model
              : (product as Accessory).name,
          productType,
          quantity,
        };
      };

      const orderItems = await Promise.all(
        items.map(
          async ({
            productId,
            productType,
            quantity,
          }: {
            productId: string;
            productType: string;
            quantity: number;
          }) => createOrderItems(productId, productType, quantity)
        )
      );

      const newOrder = orderRepository.create({
        status,
        user: currentUser,
        items: orderItems.map(
          ({ price, productId, productName, productType, quantity }) => {
            return orderItemRepository.create({
              price,
              productId,
              productName,
              productType,
              quantity,
            });
          }
        ),
      });

      newOrder.calculateFinalTotalPrice();

      const savedOrder = await orderRepository.save(newOrder);

      return res.status(200).json(savedOrder);
    } catch (error: any) {
      next(error);
    }
  }
);

order.get(
  "/orders/:type",
  param("type")
    .isIn(["scooter", "accessory"])
    .withMessage("Param type must be either scooter or accessory"),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Order[]> | void> => {
    try {
      const isValid = errorValidationCheck(req, next);
      if (!isValid) return;

      const { authToken } = req?.cookies;
      const { email } = await validateAuthToken(authToken, res);

      const currentUser = await userRepository.findOne({
        where: { email },
      });
      if (!currentUser) {
        return next({ message: msg.USER_NOT_FOUND });
      }

      const { type } = req.params;

      const orders = await orderRepository.find({
        where: { user: { id: currentUser?.id } },
        relations: {
          user: true,
          items: {
            price: true,
          },
        },
      });

      const filteredOrders = orders
        .map((order) => ({
          ...order,
          items: order.items.filter(({ productType }) => productType === type),
        }))
        .filter(({ items }) => items.length > 0);

      res.status(200).json(filteredOrders);
    } catch (error: any) {
      next(error);
    }
  }
);
