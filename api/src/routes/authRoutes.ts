import { Request, Response, Router } from "express";
import { AppDataSource } from "../config/database";
import { User } from "../entity/User";

const authRoutes = Router();

const userRepository = AppDataSource.getRepository(User);

authRoutes.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find({
      select: ["id", "password", "email"],
    });
    res.json(users);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

authRoutes.post("/create-new-user", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = userRepository.create({ email, password });

    await userRepository.save(user);
    const { password: _, ...userResponse } = user;

    res.status(200).json(userResponse);
  } catch (err: any) {
    console.error(err);
    if (err.name === "QueryFailedError") {
      res.status(400).json({ message: err.message });
    } else if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
});

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
