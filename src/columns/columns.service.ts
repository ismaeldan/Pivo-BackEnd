import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateColumnDto } from './dto/update-column.dto';
import { DB } from 'src/db/db.module';
import type { DbType } from 'src/db/db.module';
import { columns } from 'src/db/schema';
import { asc, eq } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class ColumnsService {
  constructor(@Inject(DB) private db: DbType) {}

  async create(data: {
    title: string;
    order?: number;
    authorId: string;
  }) {
    const newId = createId();
    const order = data.order ?? 0;

    const [newColumn] = await this.db
      .insert(columns)
      .values({
        id: newId,
        title: data.title,
        order: order,
        authorId: data.authorId,
      })
      .returning();

    return newColumn;
  }

  async findAll() {
    const allColumns = await this.db
      .select()
      .from(columns)
      .orderBy(asc(columns.order));

    return allColumns;
  }

  async findOne(id: string) {
    const [column] = await this.db
      .select()
      .from(columns)
      .where(eq(columns.id, id));

    if (!column) {
      throw new NotFoundException(`Coluna com ID ${id} não encontrada.`);
    }

    return column;
  }

  async update(id: string, updateColumnDto: UpdateColumnDto) {
    await this.findOne(id);

    const [updatedColumn] = await this.db
      .update(columns)
      .set(updateColumnDto)
      .where(eq(columns.id, id))
      .returning();

    return updatedColumn;
  }

  async remove(id: string) {
    await this.findOne(id);

    const [deletedColumn] = await this.db
      .delete(columns)
      .where(eq(columns.id, id))
      .returning();

    return deletedColumn;
  }
}