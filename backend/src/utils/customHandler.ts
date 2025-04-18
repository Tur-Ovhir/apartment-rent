import { Request } from "express";

export interface CustomRequest extends Request {
  user?: {
    userId: number;
    role: string;
  };
}
