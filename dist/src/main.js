"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const env_validation_1 = require("./config/env.validation");
async function bootstrap() {
    try {
        env_validation_1.envSchema.parse(process.env);
        console.log('[ENV] Environment variables validated successfully.');
    }
    catch (error) {
        console.error('❌ Invalid environment variables:', error.format());
        process.exit(1);
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') || 3001;
    app.enableCors();
    await app.listen(port);
    console.log(`[Nest] Backend running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map