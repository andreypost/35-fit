import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { Like } from "typeorm";
import { loginLimiter } from "../middleware/rateLimiter";
import {
  deleteAuthToken,
  setAuthToken,
  validateAuthToken,
} from "../auth/jsonWebToken";
import { userRepository } from "../config/database";
import bcrypt from "bcrypt";
import { msg } from "../constants/messages";
import { User } from "../entities/User";
import { UserPrivileges } from "../utils/userRoles";

export const user = Router();

user.post(
  "/create-new-user",
  body("name").notEmpty().withMessage(msg.NAME_IS_REQUIRED),
  body("surname").notEmpty().withMessage(msg.SURNAME_IS_REQUIRED),
  body("gender")
    .isIn(["nonBinary", "male", "femail"])
    .withMessage(msg.GENDER_IS_REQUIRED),
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
  // loginLimiter,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
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
        emergencyName = "",
        emergencyPhone = "",
      } = await req.body;

      const userRoles = UserPrivileges.isAdminEmail(email)
        ? UserPrivileges.Administrator
        : UserPrivileges.ProjectCreator;

      const newUser = userRepository.create({
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
        grantedPrivileges: userRoles,
        deniedPrivileges: UserPrivileges.None,
      });

      const savedUser = await userRepository.save(newUser);

      await setAuthToken(email, savedUser.id, res);

      return res
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

user.post(
  "/login",
  body("email").isEmail().withMessage(msg.VALID_EMAIL_IS_REQUIRED),
  body("password")
    .isLength({ min: 4 })
    .withMessage(msg.PASSWORD_MUTS_BE_AT_LEAST),
  // loginLimiter,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<User> | void> => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return next({
        message: err.array(),
        status: 400,
        type: "ValidationDataError",
      });
    }

    try {
      const { email, password, keepLoggedIn } = await req.body;
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

        await setAuthToken(user.email, user.id, res, keepLoggedIn);
        return res.status(201).json({ message: msg.LOGIN_SUCCESSFUL, ...user });
      }
    } catch (error: any) {
      return next(error);
    }
  }
);

user.get(
  "/validate",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<User> | void> => {
    try {
      const { authToken } = req?.cookies;
      if (!authToken) return;

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

user.get(
  "/users",
  // loginLimiter,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<User[]> | void> => {
    try {
      // const { authToken } = req?.cookies;
      // await validateAuthToken(authToken, res);

      const users = await userRepository.find();
      return res.status(200).json(users);
    } catch (error: any) {
      return next(error);
    }
  }
);

user.post(
  "/logout",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { deleteAccount } = await req?.body;
      let repoResponse = null;
      if (deleteAccount) {
        const { authToken } = req?.cookies;
        const { email } = await validateAuthToken(authToken, res);
        repoResponse = await userRepository.delete({ email });
        if (!repoResponse?.affected) {
          return next({
            message: msg.USER_ALREADY_DELETED_OR_DOES_NOT_EXIST,
            status: 404,
            type: "DeletionError",
          });
        }
      }
      await deleteAuthToken(res);
      return res.status(200).json({
        message: repoResponse?.affected
          ? msg.USER_DELETED_SUCCESSFULLY
          : msg.LOGGED_OUT_SUCCESSFUL,
        success: true,
      });
    } catch (error: any) {
      return next(error);
    }
  }
);

user.get(
  "/search",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<User[]> | void> => {
    try {
      const { authToken } = req?.cookies;
      await validateAuthToken(authToken, res);

      const { query } = req.query;
      const users = await userRepository.find({
        where: { email: Like(`%${query}%`) },
        select: ["email", "grantedPrivileges", "id", "name"],
        take: 10,
      });
      return res.status(200).json(users);
    } catch (error: any) {
      return next(error);
    }
  }
);

user.patch(
  "/:id/privileges",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<User> | void> => {
    try {
      const { authToken } = req?.cookies;
      await validateAuthToken(authToken, res);

      const { email, grantedPrivileges, deniedPrivileges } = req?.body;

      const currentUser = await userRepository.findOne({
        where: { email },
      });
      if (!currentUser) {
        return next({ message: msg.USER_NOT_FOUND });
      }

      const privileges = new UserPrivileges(
        currentUser.grantedPrivileges,
        currentUser.deniedPrivileges
      );

      if (!privileges.hasGrantedPrivilege(UserPrivileges.Administrator)) {
        return next({ message: msg.YOU_DO_NOT_HAVE_PERMISSION });
      }

      const { id } = req?.params;

      if (!id || id === "undefined") {
        return next({ message: msg.ID_IS_REQUIRED });
      }

      const user = await userRepository.findOne({ where: { id } });

      if (!user) {
        return next({ message: msg.USER_NOT_FOUND });
      }

      user.grantedPrivileges = grantedPrivileges;
      user.deniedPrivileges = deniedPrivileges;

      const savedUser = await userRepository.save(user);

      return res.status(200).json(savedUser);
    } catch (error: any) {
      return next(error);
    }
  }
);
