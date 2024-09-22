import { NextFunction, Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import { loginLimiter } from "../middleware/rateLimiter";
import {
  setAuthToken,
  validateAuthToken,
  verifyToken,
  // verifyTokenWithResponse,
} from "../auth/jsonWebToken";
import { userRepository } from "../config/database";
import { msg } from "../constants/messages";
import bcrypt from "bcrypt";

const authRoutes = Router();

authRoutes.post(
  "/login",
  body("email").isEmail().withMessage(msg.VALID_EMAIL_IS_REQUIRED),
  body("password")
    .isLength({ min: 4 })
    .withMessage(msg.PASSWORD_MUTS_BE_AT_LEAST),
  loginLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req?.cookies?.authToken;
    if (authToken) {
      const { success, message } = await verifyToken(authToken);

      const statusCode = success ? 200 : 401;
      return res
        .status(statusCode)
        .json({ success: success, message: message });
      // return await verifyTokenWithResponse(authToken, res);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const user = await userRepository.findOne({
        where: { email },
        select: ["id", "name", "email", "password"],
      });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: msg.USER_NOT_FOUND });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ success: false, message: msg.INVALID_CREDENTIALS });
      }

      await setAuthToken(user.id, user.email, res);
      res.status(201).json({ success: true, message: msg.LOGIN_SUCCESSFUL });
    } catch (err: any) {
      next(err);
    }
  }
);

authRoutes.get(
  "/users",
  loginLimiter,
  async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req?.cookies?.authToken;
    try {
      await validateAuthToken(authToken);
      const users = await userRepository.find({
        select: ["name", "age", "email"],
      });
      res.json(users);
    } catch (err: any) {
      next(err);
    }
  }
);

authRoutes.post(
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
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
      console.log(
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
        emergencyPhone
      );
      // const user = userRepository.create({
      //   name,
      //   surname,
      //   gender,
      //   age,
      //   country,
      //   city,
      //   email,
      //   password,
      //   phone,
      //   emergencyName,
      //   emergencyPhone,
      // });
      // await userRepository.save(user);

      // await setAuthToken(user.id, email, res);

      res
        .status(201)
        .json({ success: true, message: msg.USER_CREATED_SUCCESSFULLY });
    } catch (err: any) {
      next(err);
    }
  }
);

export default authRoutes;

/* import { Request, Response, Router } from "express";
import User from "../models/User";
import { ValidationError } from "sequelize";

const router = Router();

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

router.post("/create-new-user", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const userResponse = { ...user.get(), password: undefined };
    res.status(201).json(userResponse);
  } catch (error) {
    console.error(error);
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

export default router;

*/
