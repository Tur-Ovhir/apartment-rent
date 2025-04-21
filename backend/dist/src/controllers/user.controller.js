"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.registerUser = exports.loginUser = void 0;
const database_1 = __importDefault(require("../database"));
const schema_1 = require("../database/schema");
const drizzle_orm_1 = require("drizzle-orm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || "secret";
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
            return;
        }
        const [findUser] = yield database_1.default
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.email, email))
            .limit(1);
        if (!findUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, findUser.password);
        if (!passwordMatch) {
            res.status(401).json({ message: "Нууц үг буруу байна." });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: findUser.id, email: findUser.email, role: findUser.role }, secret);
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
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, email, password, name, avatar, title, role } = req.body;
    try {
        if (!phoneNumber || !email || !password) {
            res
                .status(400)
                .json({ message: "Phone number, email and password are required" });
            return;
        }
        const [existingUser] = yield database_1.default
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.email, email))
            .limit(1);
        if (existingUser) {
            res.status(409).json({ message: "User already exists with this email" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const [newUser] = yield database_1.default
            .insert(schema_1.users)
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
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id, email: newUser.email, role: newUser.role }, secret);
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
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.registerUser = registerUser;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const [user] = yield database_1.default
            .select({
            id: schema_1.users.id,
            email: schema_1.users.email,
            phoneNumber: schema_1.users.phoneNumber,
            role: schema_1.users.role,
            name: schema_1.users.name,
            avatar: schema_1.users.avatar,
            title: schema_1.users.title,
            createdAt: schema_1.users.createdAt,
        })
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, userId))
            .limit(1);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
});
exports.getMe = getMe;
