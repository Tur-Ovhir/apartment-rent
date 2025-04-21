"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const userRouter = (0, express_1.Router)();
userRouter
    .post("/login", controllers_1.loginUser)
    .post("/register", controllers_1.registerUser)
    .get("/me", middleware_1.authMiddleware, controllers_1.getMe);
exports.default = userRouter;
