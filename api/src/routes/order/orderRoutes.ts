import { NextFunction, Request, Response, Router } from "express";
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
import { Scooter } from "../../entities/Scooter";
import { Accessory } from "../../entities/Accessory";
import { Order } from "sequelize";
import { param } from "express-validator";

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

        console.log(product);

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

      console.log("orderItems: ", newOrder);
      console.log("items: ", savedOrder);
      return res.status(200).json(savedOrder);
    } catch (error: any) {
      next(error);
    }
  }
);

order.get(
  "/orders/:type",
  param("type").notEmpty().withMessage("Param type is required"),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Order[]> | void> => {
    try {
      const { type } = req.params;
      console.log("params: ", type);
      res.status(200).json({});
    } catch (error: any) {
      next(error);
    }
  }
);
