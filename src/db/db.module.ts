import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export const DB = Symbol('DB_SERVICE'); 

export type DbType = ReturnType<typeof drizzle<typeof schema>>;

const drizzleProvider = {
  provide: DB,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const connectionString = configService.get<string>('DATABASE_URL');
    const pool = new Pool({
      connectionString: connectionString,
      ssl: true, 
    });

    return drizzle(pool, { schema });
  },
};

@Global()
@Module({
  providers: [drizzleProvider],
  exports: [drizzleProvider],
})
export class DatabaseModule {}