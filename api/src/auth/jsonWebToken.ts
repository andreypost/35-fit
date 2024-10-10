import { env } from "../config/env";
import { sign, verify } from "jsonwebtoken";
import { CustomErrorHandler } from "../middleware/errorHandler";
import { msg } from "../constants/messages";
import { SECRET_JWT_KEY } from "../constants/secrets";

export const expiresInHour = 3600000; // one hour
export const expiresInMonth = 2600000000; // one hour

export const generateToken = async (
  payload: any,
  keepLoggedIn: boolean
): Promise<string> => {
  console.log("keepLoggedIn: ", keepLoggedIn);
  const options = {
    expiresIn: keepLoggedIn ? expiresInMonth : expiresInHour,
  };
  return sign(payload, SECRET_JWT_KEY, options);
};

export const setAuthToken = async (
  id: string | number | undefined,
  email: string,
  res: any,
  keepLoggedIn: boolean = false
): Promise<any> => {
  const authToken = await generateToken(
    {
      userId: id,
      email: email,
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
    maxAge: keepLoggedIn ? expiresInMonth : expiresInHour,
    // path: "/",
  });
};

export const verifyToken = async (authToken: string): Promise<any> => {
  try {
    const decoded = verify(authToken, SECRET_JWT_KEY);
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
