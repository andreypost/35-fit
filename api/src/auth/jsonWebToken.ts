import { env } from "../config/env";
import { sign, verify } from "jsonwebtoken";
import { CustomErrorHandler } from "../middleware/errorHandler";
import { msg } from "../constants/messages";
import { secrets } from "../constants/secrets";

export const generateToken = async (
  payload: any,
  keepLoggedIn: boolean
): Promise<string> => {
  const options = {
    expiresIn: keepLoggedIn ? secrets.LONG_EXPIRES_IN : secrets.EXPIRES_IN,
  };
  return sign(payload, env.JWT_KEY as string, options);
};

export const setAuthToken = async (
  email: string,
  id: string | number | undefined,
  res: any,
  keepLoggedIn: boolean = false
): Promise<any> => {
  const authToken = await generateToken(
    {
      email,
      id,
    },
    keepLoggedIn
  );

  if (!authToken) {
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

export const verifyToken = async (authToken: string): Promise<any> => {
  try {
    const decoded = verify(authToken, env.JWT_KEY as string);
    if (decoded && typeof decoded !== "string") {
      return {
        message: msg.USER_ALREADY_LOGGED_IN,
        success: true,
        email: decoded.email,
      };
    }
  } catch (error) {
    return { message: msg.INVALID_OR_EXPIRED_TOKEN, success: false };
  }
};

export const validateAuthToken = async (
  authToken: string,
  res: any
): Promise<any> => {
  if (!authToken) {
    throw new CustomErrorHandler(msg.YOU_MUST_TO_LOGIN, 401, "LoginError");
  }
  const { message, success, email } = await verifyToken(authToken);
  if (!success) {
    deleteAuthToken(res);
    throw new CustomErrorHandler(message, 401, "ValidationTokenError");
  } else if (success) {
    return { message: msg.USER_ALREADY_LOGGED_IN, success: true, email };
  }
};

export const deleteAuthToken = async (res: any): Promise<any> => {
  return res.clearCookie("authToken", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
  });
};
