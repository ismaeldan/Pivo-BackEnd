"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(3001),
    JWT_SECRET: zod_1.z.string().min(1),
    JWT_EXPIRATION: zod_1.z.coerce.number().min(1),
    DATABASE_HOST: zod_1.z.string().default('localhost'),
    DATABASE_PORT: zod_1.z.coerce.number().default(5432),
    DATABASE_USER: zod_1.z.string().min(1),
    DATABASE_PASSWORD: zod_1.z.string().min(1),
    DATABASE_NAME: zod_1.z.string().min(1),
});
//# sourceMappingURL=env.validation.js.map