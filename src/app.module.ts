import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './config/env.validation';
import { DatabaseModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { ColumnsModule } from './columns/columns.module';
import { AuthModule } from './auth/auth.module';

function validate(config: Record<string, unknown>) {
  const validatedConfig = envSchema.parse(config);
  return validatedConfig;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate,
    }),
    DatabaseModule,
    UsersModule,
    TasksModule,
    ColumnsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}