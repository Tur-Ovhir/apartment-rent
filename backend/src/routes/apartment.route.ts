import { Router } from "express";
import {
  createApartment,
  deleteApartment,
  getApartmentById,
  getApartments,
  updateApartment,
} from "../controllers";

const apartmentRouter = Router();

apartmentRouter
  .get("/", getApartments)
  .get("/:id", getApartmentById)
  .post("/", createApartment)
  .put("/:id", updateApartment)
  .delete("/:id", deleteApartment);

export default apartmentRouter;
