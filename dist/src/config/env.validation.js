"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envSchema = void 0;
const zod_1 = require("zod");
exports.envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(3001),
    DATABASE_URL: zod_1.z.string().url(),
});
//# sourceMappingURL=env.validation.js.map