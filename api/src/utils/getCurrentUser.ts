import { Response } from "express";
import { deleteAuthToken, validateAuthToken } from "../auth/jsonWebToken";
import { userRepository } from "../db/database";
import { User } from "../entities/User";
import { CustomErrorHandler } from "../middleware/errorHandler";
import { msg } from "../constants/messages";

export const getCurrentUser = async (
  authToken: string,
  res: Response
): Promise<User | never> => {
  const { email } = await validateAuthToken(authToken, res);

  const currentUser = await userRepository.findOne({
    where: { email },
  });

  if (!currentUser) {
    deleteAuthToken(res);
    throw new CustomErrorHandler(msg.USER_NOT_FOUND, 404, "NotFoundError");
  }

  return currentUser;
};
