"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const apartmentRouter = (0, express_1.Router)();
apartmentRouter
    .get("/", controllers_1.getApartments)
    .get("/:id", controllers_1.getApartmentById)
    .post("/", middleware_1.authMiddleware, controllers_1.createApartment)
    .put("/:id", middleware_1.authMiddleware, controllers_1.updateApartment)
    .delete("/:id", middleware_1.authMiddleware, controllers_1.deleteApartment);
exports.default = apartmentRouter;
