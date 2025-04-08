import { NextFunction, Request, Response, Router } from "express";
import { validateScooterDto } from "./scooterDto";
import { Scooter } from "../../entities/Scooter";
import { errorValidationCheck } from "../../validators/errorValidationCheck";
import { Price } from "../../entities/Price";
import { getPriceById } from "../price/priceRoutes";
import { msg } from "../../constants/messages";
import { scooterRepository } from "../../config/database";

export const scooter = Router();

const checkExistingScooter = async (
  model: string,
  priceId: string,
  returnedProductId = false,
  next: NextFunction
): Promise<Price | string | undefined> => {
  try {
    const price = await getPriceById(priceId, next);
    if (!price) return;

    if (price.productType !== "scooter") {
      next({
        message: `${price.productType} ${msg.PRODUCT_TYPE_IS_NOT_APPROPRIATE}`,
        status: 400,
        type: "ValidationError",
      });
      return;
    }

    const existingScooter = await scooterRepository.findOne({
      where: {
        model,
        price: { id: priceId },
      },
      relations: ["price"],
    });

    if (existingScooter) {
      if (returnedProductId) {
        return existingScooter.id;
      }
      next({
        message: `${model} ${existingScooter.price?.name} ${msg.PRODUCT_PRICE_ALREADY_IN_USE}`,
        status: 400,
        type: "ValidationError",
      });
      return;
    }

    return returnedProductId ? undefined : price;
  } catch (error: any) {
    next(error);
    return;
  }
};

scooter.post(
  "/check",
  validateScooterDto,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<string> | void> => {
    try {
      const isValid = errorValidationCheck(req, next);
      if (!isValid) return;

      const { model, priceId } = req.body;

      const id = await checkExistingScooter(model, priceId, true, next);

      return res.status(200).json(id);
    } catch (error: any) {
      next(error);
    }
  }
);

scooter.post(
  "/create",
  validateScooterDto,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Scooter> | void> => {
    try {
      const isValid = errorValidationCheck(req, next);
      if (!isValid) return;

      const { model, priceId, rentalPricePerDay, saleType } = req.body;

      const price = await checkExistingScooter(model, priceId, false, next);
      if (!price || typeof price === "string") return;

      const newScooter = scooterRepository.create({
        model,
        rentalPricePerDay,
        saleType,
        price,
      });

      const savedScooter = await scooterRepository.save(newScooter);

      return res.status(200).json(savedScooter);
    } catch (error: any) {
      next(error);
    }
  }
);
