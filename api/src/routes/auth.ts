import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { loginLimiter } from "../middleware/rateLimiter";
import {
  deleteAuthToken,
  setAuthToken,
  validateAuthToken,
} from "../auth/jsonWebToken";
import { userRepository } from "../config/database";
import { msg } from "../constants/messages";
import bcrypt from "bcrypt";

const auth = Router();

auth.post(
  "/create-new-user",
  body("name").notEmpty().withMessage(msg.NAME_IS_REQUIRED),
  body("surname").notEmpty().withMessage(msg.SURNAME_IS_REQUIRED),
  body("gender").notEmpty().withMessage(msg.GENDER_IS_REQUIRED),
  body("age").isInt({ min: 1, max: 111 }).withMessage(msg.VALID_AGE_REQUIRED),
  body("country").notEmpty().withMessage(msg.COUNTRY_IS_REQUIRED),
  body("city").notEmpty().withMessage(msg.CITY_IS_REQUIRED),
  body("email").isEmail().withMessage(msg.VALID_EMAIL_IS_REQUIRED),
  body("password")
    .isLength({ min: 4 })
    .withMessage(msg.PASSWORD_MUTS_BE_AT_LEAST),
  body("phone")
    .isMobilePhone(["uk-UA", "en-US", "pl-PL"])
    .withMessage(msg.PLEASE_ENTER_A_VALID_PHONE),
  loginLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return next({
        message: err.array(),
        status: 400,
        type: "ValidationDataError",
      });
    }
    try {
      const {
        name,
        surname,
        gender,
        age,
        country,
        city,
        email,
        password,
        phone,
        emergencyName,
        emergencyPhone,
      } = req.body;
      const user = userRepository.create({
        name,
        surname,
        gender,
        age,
        country,
        city,
        email,
        password,
        phone,
        emergencyName,
        emergencyPhone,
      });

      await setAuthToken(user.id, email, res);

      await userRepository.save(user);

      res
        .status(201)
        .json({ message: msg.USER_CREATED_SUCCESSFULLY, success: true });
    } catch (error: any) {
      await deleteAuthToken(res);
      if (error.code === "23505") {
        return next({
          message: msg.EMAIL_ALREADY_EXIST,
          status: 400,
          type: "DatabaseValidationError",
        });
      } else {
        return next(error);
      }
    }
  }
);

auth.post(
  "/login",
  body("email").isEmail().withMessage(msg.VALID_EMAIL_IS_REQUIRED),
  body("password")
    .isLength({ min: 4 })
    .withMessage(msg.PASSWORD_MUTS_BE_AT_LEAST),
  loginLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return next({
        message: err.array(),
        status: 400,
        type: "ValidationDataError",
      });
    }

    try {
      const { email, password } = req.body;
      const user = await userRepository.findOne({
        where: { email },
      });
      if (!user) {
        return next({
          message: msg.USER_NOT_FOUND,
          status: 404,
          type: "FindUserError",
        });
      } else {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return next({
            message: msg.INVALID_CREDENTIALS,
            status: 401,
            type: "CredentialsError",
          });
        }

        await setAuthToken(user.id, user.email, res);
        return res.status(201).json(user);
      }
    } catch (error: any) {
      return next(error);
    }
  }
);

auth.get(
  "/users",
  loginLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authToken = req?.cookies?.authToken;
      await validateAuthToken(authToken, res);

      const users = await userRepository.find({
        select: ["name", "age", "email"],
      });
      return res.status(200).json(users);
    } catch (error: any) {
      return next(error);
    }
  }
);

auth.delete(
  "/delete-user-by-email",
  body("email").isEmail().withMessage(msg.VALID_EMAIL_IS_REQUIRED),
  async (req: Request, res: Response, next: NextFunction) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return next({
        message: err.array(),
        status: 400,
        type: "ValidationDataError",
      });
    }
    try {
      const authToken = req?.cookies?.authToken;
      await validateAuthToken(authToken, res);

      const { email } = req.body;
      const { affected } = await userRepository.delete({ email });

      if (affected) {
        // await deleteAuthToken(res); // probably do not need
        return res
          .status(200)
          .json({ message: msg.USER_DELETED_SUCCESSFULLY, success: true });
      } else {
        return next({
          message: msg.USER_ALREADY_DELETED_OR_DOES_NOT_EXIST,
          status: 404,
          type: "DeletionError",
        });
      }
    } catch (error: any) {
      return next(error);
    }
  }
);

auth.get(
  "/validate",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authToken = req?.cookies?.authToken;
      const { email } = await validateAuthToken(authToken, res);

      const user = await userRepository.findOne({
        where: { email },
      });

      if (!user) {
        await deleteAuthToken(res);
        return next({
          message: msg.USER_NOT_FOUND,
          status: 404,
          type: "FindUserError",
        });
      }
      return res.status(200).json(user);
    } catch (error: any) {
      return next(error);
    }
  }
);

auth.post(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteAuthToken(res);
      return res
        .status(200)
        .json({ message: msg.TOKEN_WAS__DELETED_SUCCESSFULLY, success: true });
    } catch (error: any) {
      return next(error);
    }
  }
);

export default auth;
