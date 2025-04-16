import { Router } from "express";
import { getMe, loginUser, registerUser } from "../controllers";
import { authMiddleware } from "../middleware";

const userRouter = Router();

userRouter
  .post("/login", loginUser)
  .post("/register", registerUser)
  .get("/me", authMiddleware, getMe);

export default userRouter;
