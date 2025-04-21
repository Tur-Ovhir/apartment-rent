"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: "./src/database/schema.ts",
    dialect: "postgresql",
    out: "./drizzle",
    verbose: true,
    dbCredentials: {
        host: "ep-falling-base-a8djzhhd-pooler.eastus2.azure.neon.tech",
        user: "neonDb_owner",
        password: "npg_a5VBwUrMYQ7y",
        database: "neonDb",
        ssl: "require",
    },
});
