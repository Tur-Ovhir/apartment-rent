import { Router } from "express";
import {
  createApartment,
  deleteApartment,
  getApartmentById,
  getApartments,
  updateApartment,
} from "../controllers";
import { authMiddleware } from "../middleware";

const apartmentRouter = Router();

apartmentRouter
  .get("/", getApartments)
  .get("/:id", getApartmentById)
  .post("/", authMiddleware, createApartment)
  .put("/:id", authMiddleware, updateApartment)
  .delete("/:id", authMiddleware, deleteApartment);

export default apartmentRouter;
