import { NextFunction, Response } from "express";
import { nextError } from "./nextError";
import { validateAuthToken } from "../auth/jsonWebToken";
import { userRepository } from "../db/database";
import { msg } from "../constants/messages";
import { User } from "../entities/User";

export const getCurrentUser = async (
  authToken: string,
  res: Response,
  next: NextFunction
): Promise<User | void | any> => {
  try {
    const { email } = await validateAuthToken('authToken', res);

    const currentUser = await userRepository.findOne({
      where: { email },
    });
    if (!currentUser) {
      throw next({ message: msg.USER_NOT_FOUND });
    }

    return currentUser;
  } catch (error: unknown) {
    console.log("getCurrentUser catch block", error)
    // nextError(next, error);
    next(error)
    return
  }
};
