import { Request, Response, Router } from "express";
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
import { validateRequest } from "../../validators/errorValidationCheck";
import { msg } from "../../constants/messages";
import { UserPrivileges } from "../../utils/userRoles";
import { CustomErrorHandler } from "../../middleware/errorHandler";
import { IDatabaseUser } from "./user.types";

export const user = Router();

user.post(
  "/create-new-user",
  rateLimitHandler(2 * 60 * 1000, 5, msg.TOO_MANY_REQUESTS),
  validateUserDto,
  validateRequest,
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<Response<{ message: string }> | void> => {
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
        name: string;
        surname: string;
        gender: string;
        age: number;
        country: string;
        city: string;
        email: string;
        password: string;
        phone: string;
        emergencyName?: string;
        emergencyPhone?: string;
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
    }
  )
);

user.post(
  "/login",
  validateEmailPasswordDto,
  validateRequest,
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<Response<IDatabaseUser> | void> => {
      const { email, password, keepLoggedIn } = await req.body;
      const user = await userRepository.findOne({
        where: { email },
      });

      if (!user) {
        throw new CustomErrorHandler(msg.USER_NOT_FOUND, 404, "FindUserError");
      } else {
        const isPasswordValid = await user.checkPassword(password);
        if (!isPasswordValid) {
          throw new CustomErrorHandler(
            msg.INVALID_CREDENTIALS,
            401,
            "CredentialsError"
          );
        }

        await setAuthToken(user.email, user.id, res, keepLoggedIn);
        return res.status(201).json({ message: msg.LOGIN_SUCCESSFUL, ...user });
      }
    }
  )
);

user.get(
  "/validate",
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<Response<IDatabaseUser> | void> => {
      const currentUser = await getCurrentUser(req?.cookies?.authToken, res);

      return res.status(200).json(currentUser);
    }
  )
);

user.get(
  "/users",
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<Response<IDatabaseUser[]> | void> => {
      const users = await userRepository.find();
      return res.status(200).json(users);
    }
  )
);

user.post(
  "/logout",
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<Response<{ message: string }> | void> => {
      const { deleteAccount } = await req?.body;

      let repoResponse = null;

      if (deleteAccount) {
        const { email } = await validateAuthToken(req?.cookies?.authToken, res);
        repoResponse = await userRepository.delete({ email });

        if (!repoResponse?.affected) {
          throw new CustomErrorHandler(
            msg.USER_ALREADY_DELETED_OR_DOES_NOT_EXIST,
            404,
            "DeletionError"
          );
        }
      }

      deleteAuthToken(res);

      return res.status(200).json({
        message: repoResponse?.affected
          ? msg.USER_DELETED_SUCCESSFULLY
          : msg.LOGGED_OUT_SUCCESSFUL,
      });
    }
  )
);

user.get(
  "/search",
  validateSearchQueryDto,
  validateRequest,
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<Response<IDatabaseUser[]> | void> => {
      await validateAuthToken(req?.cookies?.authToken, res);

      const { searchQuery } = req.query;

      const users = await userRepository.find({
        where: { email: Like(`%${searchQuery}%`) },
        select: ["email", "grantedPrivileges", "id", "name"],
        take: 10,
      });
      return res.status(200).json(users);
    }
  )
);

user.patch(
  "/:id/privileges",
  validatePrivilegesDto,
  validateRequest,
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<Response<IDatabaseUser> | void> => {
      const { email } = await validateAuthToken(req?.cookies?.authToken, res);

      const currentUser = await userRepository.findOne({
        where: { email },
      });

      if (!currentUser) {
        throw new CustomErrorHandler(msg.USER_NOT_FOUND, 404, "NotFoundError");
      }

      const privileges = new UserPrivileges(
        currentUser.grantedPrivileges,
        currentUser.deniedPrivileges
      );

      if (!privileges.hasGrantedPrivilege(UserPrivileges.Administrator)) {
        throw new CustomErrorHandler(
          msg.YOU_DO_NOT_HAVE_PERMISSION,
          403,
          "ForbiddenError"
        );
      }

      const { id } = req?.params;

      const user = await userRepository.findOne({ where: { id } });

      if (!user) {
        throw new CustomErrorHandler(msg.USER_NOT_FOUND, 404, "NotFoundError");
      }

      const { grantedPrivileges, deniedPrivileges } = req?.body;

      user.grantedPrivileges = grantedPrivileges;
      user.deniedPrivileges = deniedPrivileges;

      const savedUser = await userRepository.save(user);

      return res.status(200).json(savedUser);
    }
  )
);

user.get(
  "/sql",
  asyncHandler(
    async (
      req: Request,
      res: Response
    ): Promise<Response<IDatabaseUser> | void> => {
      const { email, password } = req.query;

      console.log("query email: ", email);
      const unsafeQuery = `SELECT * FROM "user" WHERE email = '${email}'`;

      const unsafeResult = await userRepository.query(unsafeQuery);
      return res.status(200).json(unsafeResult);
    }
  )
);
