import { Inject, Injectable } from '@nestjs/common';
import { DB } from 'src/db/db.module';
import type { DbType } from 'src/db/db.module';
import { columns, tasks } from 'src/db/schema';
import { asc, eq } from 'drizzle-orm';

@Injectable()
export class BoardService {
  
  constructor(@Inject(DB) private db: DbType) {}

  async getBoardData(authorId: string) {
    const boardColumns = await this.db.query.columns.findMany({
      where: eq(columns.authorId, authorId),
      orderBy: [asc(columns.order)],
      with: {
        tasks: {
          orderBy: [asc(tasks.order), asc(tasks.createdAt)],
        },
      },
    });
    return boardColumns;
  }
}