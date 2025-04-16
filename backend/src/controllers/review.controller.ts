import { RequestHandler, Response } from "express";
import db from "../database";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../utils/customHandler";

export const loginUser: RequestHandler = async (req, res) => {
  const { phoneNumber, email, password, name, avatar, title, role } = req.body;
};
