import { env } from "../config/env";
import { sign, verify } from "jsonwebtoken";
import { msg } from "../constants/messages";

export const SECRET_JWT_KEY = env.JWT_KEY as string;
export const expiresIn = 3600000; // one hour

export const generateToken = async (payload: any) => {
  const options = {
    expiresIn: expiresIn,
  };
  return sign(payload, SECRET_JWT_KEY, options);
};

export const setAuthToken = async (
  id: string | number | undefined,
  email: string,
  res: any
) => {
  const authToken = await generateToken({
    userId: id,
    email: email,
  });

  if (!authToken) {
    throw new Error(msg.FAILED_TO_GENERATE_TOKEN);
  }

  return res.cookie("authToken", authToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: expiresIn,
    // path: "/",
  });
};

export const verifyToken = async (authToken: string) => {
  try {
    verify(authToken, SECRET_JWT_KEY);
    return { success: true, message: msg.USER_ALREADY_LOGGED_IN };
  } catch (error) {
    return { success: false, message: msg.INVALID_OR_EXPIRED_TOKEN };
  }
};

// export const verifyTokenWithResponse = async (authToken: string, res: any) => {
//   const { success, message } = await verifyToken(authToken);

//   const statusCode = success ? 200 : 401;
//   return res.status(statusCode).json({ success: success, message: message });
// };

export const validateAuthToken = async (authToken: string) => {
  if (!authToken) {
    throw new Error(msg.YOU_MUST_TO_LOGIN);
  }
  const { success, message } = await verifyToken(authToken);
  if (!success) {
    throw new Error(message);
  }
};

export const deleteAuthToken = async (res: any, authToken: string) => {
  return res.clearCookie(authToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict",
  });
};
