"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const apartment_route_1 = __importDefault(require("./routes/apartment.route"));
const multer_1 = __importStar(require("multer"));
const cloudinary_1 = require("cloudinary");
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use("/auth", user_route_1.default);
app.use("/apartment", apartment_route_1.default);
app.get("/", (_req, res) => {
    res.send("Hello, TypeScript Node Express!");
});
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const storage = (0, multer_1.memoryStorage)();
const upload = (0, multer_1.default)({ storage });
function handleUpload(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield cloudinary_1.v2.uploader.upload(file, {
            resource_type: "auto",
        });
        return res;
    });
}
app.post("/upload", upload.array("images", 10), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    if (!files || !Array.isArray(files)) {
        res.status(400).send("No files uploaded.");
        return;
    }
    try {
        const uploadResults = yield Promise.all(files.map((file) => {
            const b64 = Buffer.from(file.buffer).toString("base64");
            const dataURI = `data:${file.mimetype};base64,${b64}`;
            return handleUpload(dataURI);
        }));
        res.json(uploadResults);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error uploading files to cloudinary.");
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
