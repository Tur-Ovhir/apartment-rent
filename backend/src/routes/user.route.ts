import { Router } from "express";
import { getMe, loginUser, registerUser } from "../controllers";

const userRouter = Router();

userRouter
  .post("/login", loginUser)
  .post("register", registerUser)
  .get("/me", getMe);

export default userRouter;
