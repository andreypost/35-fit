import { NextFunction, Request, Response, Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { validatePriceDto, validatePriceNameQueryDto } from "./price.dto";
import { validateRequest } from "../../validators/errorValidationCheck";
import { priceRepository } from "../../db/database";
import { Price } from "../../entities/Price";
import { CustomErrorHandler } from "../../middleware/errorHandler";
import { msg } from "../../constants/messages";
import { nextError } from "../../utils/nextError";

export const price = Router();

export const getPriceById = async (
  priceId: string,
  next: NextFunction
): Promise<Price | void> => {
  try {
    const price = await priceRepository.findOne({
      where: { id: priceId },
    });
    if (!price) {
      next({
        message: msg.PRICE_NOT_FOUND,
      });
      return;
    }
    return price;
  } catch (error: unknown) {
    nextError(next, error);
  }
};

price.get(
  "/check-set",
  validatePriceNameQueryDto,
  validateRequest,
  asyncHandler(
    async (req: Request, res: Response): Promise<Response<string> | void> => {
      const { priceName } = req.query as { priceName: string };

      const priceExists = await priceRepository.findOne({
        where: { name: priceName },
      });

      return res.status(200).json(priceExists ? priceExists.id : null);
    }
  )
);

price.post(
  "/create",
  validatePriceDto,
  validateRequest,
  asyncHandler(
    async (req: Request, res: Response): Promise<Response<string> | void> => {
      const {
        name,
        amount,
        discount = 0,
        taxRate = 0,
        currency,
        productType,
      } = req.body;

      const priceExists = await priceRepository.findOne({ where: { name } });
      if (priceExists) {
        throw new CustomErrorHandler(
          `${priceExists.name} ${msg.PRICE_NAME_ALREADY_EXIST}`,
          409,
          "ConflictDatabaseError"
        );
      }

      const newPrice = priceRepository.create({
        name,
        amount,
        discount,
        taxRate,
        currency,
        productType,
      });

      const savedPrice = await priceRepository.save(newPrice);

      return res.status(200).json(savedPrice.id);
    }
  )
);
