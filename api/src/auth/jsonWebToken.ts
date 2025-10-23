import { Response } from "express";
import { env } from "../db/env";
import { sign, verify } from "jsonwebtoken";
import { CustomErrorHandler } from "../middleware/errorHandler";
import { msg } from "../constants/messages";
import { secrets } from "../constants/secrets";

export const setAuthToken = async (
  email: string,
  id: string | number,
  res: Response,
  keepLoggedIn: boolean = false
): Promise<Response | void> => {
  const expiresIn = keepLoggedIn ? secrets.LONG_EXPIRES_IN : secrets.EXPIRES_IN;

  let authToken: string = ''

  try {
    authToken = sign({ email, id }, env.JWT_KEY as string, { expiresIn });
  } catch {
    throw new CustomErrorHandler(
      msg.FAILED_TO_GENERATE_TOKEN,
      500,
      "GenerationTokenError"
    );
  }

  return res.cookie("authToken", authToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: keepLoggedIn ? secrets.LONG_EXPIRES_IN : secrets.EXPIRES_IN,
    // path: "/",
  });
};

export const validateAuthToken = async (
  authToken: string,
  res: Response
): Promise<{ email: string }> => {
  if (!authToken) {
    throw new CustomErrorHandler(msg.YOU_MUST_TO_LOGIN, 401, "LoginError");
  }

  try {
    const decoded = verify(authToken, env.JWT_KEY as string) as {
      email: string;
    };

    return { email: decoded.email };
  } catch {
    deleteAuthToken(res);
    throw new CustomErrorHandler(
      msg.INVALID_OR_EXPIRED_TOKEN,
      401,
      "ValidationTokenError"
    );
  }
};

export const deleteAuthToken = (res: Response): Response<void> => {
  return res.clearCookie("authToken", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
  });
};
