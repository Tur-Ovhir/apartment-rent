import { RequestHandler, Response } from "express";
import db from "../database";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../utils/customHandler";

const secret = process.env.JWT_SECRET || "secret";

export const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const [findUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!findUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, findUser.password);
    if (!passwordMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: findUser.id, email: findUser.email, role: findUser.role },
      secret
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: findUser.id,
        email: findUser.email,
        role: findUser.role,
        name: findUser.name,
        avatar: findUser.avatar,
        title: findUser.title,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const registerUser: RequestHandler = async (req, res) => {
  const { phoneNumber, email, password, name, avatar, title, role } = req.body;

  try {
    if (!phoneNumber || !email || !password) {
      res
        .status(400)
        .json({ message: "Phone number, email and password are required" });
      return;
    }

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser) {
      res.status(409).json({ message: "User already exists with this email" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        phoneNumber,
        email,
        password: hashedPassword,
        name,
        avatar,
        title,
        role: role || "renter",
      })
      .returning();

    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      secret
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name,
        avatar: newUser.avatar,
        title: newUser.title,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getMe = async (req: CustomRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const userId = req.user?.userId;

    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        phoneNumber: users.phoneNumber,
        role: users.role,
        name: users.name,
        avatar: users.avatar,
        title: users.title,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
