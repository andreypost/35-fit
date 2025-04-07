import { NextFunction, Request, Response, Router } from "express";
import { validatePriceDto, validatePriceNameQueryDto } from "./priceDto";
import { errorValidationCheck } from "../../validators/errorValidationCheck";
import { priceRepository } from "../../config/database";
import { Price } from "../../entities/Price";
import { msg } from "../../constants/messages";

export const price = Router();

const checkSetPriceByName = async (
  priceName: string,
  returnPrice: boolean = false,
  next: NextFunction
) => {
  const existingPrice = await priceRepository.findOne({
    where: { name: priceName },
  });

  if (existingPrice) {
    if (returnPrice) {
      return existingPrice?.id;
    } else if (!returnPrice) {
      next({
        message: `${existingPrice.name} ${msg.PRICE_NAME_ALREADY_EXIST}`,
        status: 400,
        type: "ConflictDatabaseError",
      });
      return true;
    }
  }
  return false;
};

price.get(
  "/check-set",
  validatePriceNameQueryDto,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<string> | void> => {
    try {
      const isValid = errorValidationCheck(req, next);
      if (!isValid) return;

      const { priceName } = req.query as { priceName: string };

      const priceExists = await checkSetPriceByName(priceName, true, next);
      if (!priceExists) return;

      return res.status(200).json(priceExists);
    } catch (error: any) {
      next(error);
    }
  }
);

price.post(
  "/create",
  validatePriceDto,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<Price> | void> => {
    try {
      const {
        name,
        amount,
        discount = 0,
        taxRate = 0,
        currency,
        productType,
      } = req.body;

      const priceExists = await checkSetPriceByName(name, false, next);
      if (priceExists) return;

      const newPrice = priceRepository.create({
        name,
        amount,
        discount,
        taxRate,
        currency,
        productType,
      });

      const savedPrice = await priceRepository.save(newPrice);

      return res.status(200).json(savedPrice);
    } catch (error: any) {
      next(error);
    }
  }
);
