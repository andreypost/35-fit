import { NextFunction, Router } from "express";
import { Accessory } from "../../entities/Accessory";
import { getPriceById } from "../price/priceRoutes";
import { msg } from "../../constants/messages";

const accessory = Router();

const checkExistingAccessory = async (
  name: string,
  priceId: string,
  returnedProductId: boolean = false,
  next: NextFunction
): Promise<Accessory | string | undefined> => {
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
  } catch (error: any) {
    next(error);
  }
};
