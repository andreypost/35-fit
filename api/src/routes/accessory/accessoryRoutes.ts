import { NextFunction, Request, Response, Router } from "express";
import { Price } from "../../entities/Price";
import { Accessory } from "../../entities/Accessory";
import { getPriceById } from "../price/priceRoutes";
import { msg } from "../../constants/messages";
import { accessoryRepository } from "../../config/database";
import { validateAccessoryDto } from "./accessoryDto";
import { errorValidationCheck } from "../../validators/errorValidationCheck";
import { nextError } from "../../utils/nextError";

export const accessory = Router();

const checkExistingAccessory = async (
  name: string,
  priceId: string,
  returnedProductId: boolean = false,
  next: NextFunction
): Promise<Price | string | undefined> => {
  try {
    const price = await getPriceById(priceId, next);
    if (!price) return;

    if (price.productType !== "accessory") {
      next({
        message: `${price.productType} ${msg.PRODUCT_TYPE_IS_NOT_APPROPRIATE}`,
        staus: 400,
        type: "ValidationError",
      });
      return;
    }

    const existingAccessory = await accessoryRepository.findOne({
      where: { name, price: { id: priceId } },
      relations: ["price"],
    });

    if (existingAccessory) {
      if (returnedProductId) {
        return existingAccessory?.id;
      } else {
        next({
          message: `name ${existingAccessory?.price?.name} ${msg.PRODUCT_PRICE_ALREADY_IN_USE}`,
          status: 400,
          type: "ValidationError",
        });
        return;
      }
    }
    return returnedProductId ? undefined : price;
  } catch (error: unknown) {
    nextError(next, error);
  }
};

accessory.post(
  "/check",
  validateAccessoryDto,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<string> | void> => {
    try {
      const isValid = errorValidationCheck(req, next);
      if (!isValid) return;

      const { name, priceId } = req?.body;

      const id = await checkExistingAccessory(name, priceId, true, next);

      if (!id) return;

      return res.status(200).json(id);
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);

accessory.post(
  "/create",
  validateAccessoryDto,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Accessory> | void> => {
    try {
      const isValid = errorValidationCheck(req, next);
      if (!isValid) return;

      const { name, priceId } = req?.body;

      const price = await checkExistingAccessory(name, priceId, false, next);
      if (!price || typeof price === "string") return;

      const newAccessory = accessoryRepository.create({
        name,
        price,
      });

      const savedAccessory = await accessoryRepository.save(newAccessory);

      return res.status(200).json(savedAccessory);
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);
