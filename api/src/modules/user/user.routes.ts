import { NextFunction, Request, Response, Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Like } from "typeorm";
import { getCurrentUser } from "../../utils/getCurrentUser";
import {
  deleteAuthToken,
  setAuthToken,
  validateAuthToken,
} from "../../auth/jsonWebToken";
import { userRepository } from "../../db/database";
import { rateLimitHandler } from "../../middleware/rateLimiter";
import {
  validateSearchQueryDto,
  validatePrivilegesDto,
  validateUserDto,
} from "./user.dto";
import { validateEmailPasswordDto } from "../../validators/commonValidators";
import { errorValidationCheck, validateRequest } from "../../validators/errorValidationCheck";
import { msg } from "../../constants/messages";
import { UserPrivileges } from "../../utils/userRoles";
import { CustomErrorHandler, isPgUniqueViolation } from "../../middleware/errorHandler";
import { IDatabaseUser } from "./user.types";
import { nextError } from "../../utils/nextError";

export const user = Router();

user.post(
  "/create-new-user",
  rateLimitHandler(2 * 60 * 1000, 5, msg.TOO_MANY_REQUESTS),
  validateUserDto,
  validateRequest,
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ): Promise<Response | void> => {

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
      } = req.body as {
        name: string; surname: string; gender: string; age: number;
        country: string; city: string; email: string; password: string; phone: string;
        emergencyName?: string; emergencyPhone?: string;
      };

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

      return res.status(201).json({ message: msg.USER_CREATED_SUCCESSFULLY });
    })
);

user.post(
  "/login",
  validateEmailPasswordDto,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IDatabaseUser> | void> => {
    try {
      const isValid = errorValidationCheck(req, next);
      if (!isValid) return;

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
        const isPasswordValid = await user.checkPassword(password);
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
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);

user.get(
  "/validate",
  asyncHandler(
    async (
      req: Request,
      res: Response,
    ): Promise<Response<IDatabaseUser> | never> => {
      const currentUser = await getCurrentUser(req?.cookies?.authToken, res);

      return res.status(200).json(currentUser);
    })
);

user.get(
  "/users",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IDatabaseUser[]> | void> => {
    try {
      // const { authToken } = req?.cookies;
      // await validateAuthToken(authToken, res);

      const users = await userRepository.find();
      return res.status(200).json(users);
    } catch (error: unknown) {
      nextError(next, error);
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
      deleteAuthToken(res);
      return res.status(200).json({
        message: repoResponse?.affected
          ? msg.USER_DELETED_SUCCESSFULLY
          : msg.LOGGED_OUT_SUCCESSFUL,
      });
    } catch (error: unknown) {
      // if (isPgUniqueViolation(error, "23503")) {
      //   return next({
      //     message: msg.USER_CANNOT_BE_DELETED,
      //     status: 400,
      //     type: "DatabaseValidationError",
      //   });
      // }
      nextError(next, error);
    }
  }
);

user.get(
  "/search",
  validateSearchQueryDto,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IDatabaseUser[]> | void> => {
    try {
      const isValid = errorValidationCheck(req, next);
      if (!isValid) return;

      const { authToken } = req?.cookies;
      await validateAuthToken(authToken, res);

      const { searchQuery } = req.query;

      const users = await userRepository.find({
        where: { email: Like(`%${searchQuery}%`) },
        select: ["email", "grantedPrivileges", "id", "name"],
        take: 10,
      });
      return res.status(200).json(users);
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);

user.patch(
  "/:id/privileges",
  validatePrivilegesDto,
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IDatabaseUser> | void> => {
    try {
      const isValid = errorValidationCheck(req, next);
      if (!isValid) return;

      const { authToken } = req?.cookies;
      const { email } = await validateAuthToken(authToken, res);

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

      const user = await userRepository.findOne({ where: { id } });

      if (!user) {
        return next({ message: msg.USER_NOT_FOUND });
      }

      const { grantedPrivileges, deniedPrivileges } = req?.body;

      user.grantedPrivileges = grantedPrivileges;
      user.deniedPrivileges = deniedPrivileges;

      const savedUser = await userRepository.save(user);

      return res.status(200).json(savedUser);
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);

user.get(
  "/sql",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IDatabaseUser> | void> => {
    try {
      const { email, password } = req.query;

      console.log("query email: ", email);
      const unsafeQuery = `SELECT * FROM "user" WHERE email = '${email}'`;

      const unsafeResult = await userRepository.query(unsafeQuery);
      return res.status(200).json(unsafeResult);
    } catch (error: unknown) {
      nextError(next, error);
    }
  }
);
