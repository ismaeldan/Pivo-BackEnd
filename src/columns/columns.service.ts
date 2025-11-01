import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateColumnDto } from './dto/update-column.dto';
import { DB } from 'src/db/db.module';
import type { DbType } from 'src/db/db.module';
import { columns, tasks, TaskStatus } from 'src/db/schema'; 
import {
  asc,
  eq,
  and,
  max,
  sql,
  gt,
  gte,
  desc,
  lt, 
  lte,
  not,
  ilike,
  or,
} from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

@Injectable()
export class ColumnsService {
  constructor(@Inject(DB) private db: DbType) {}
  
  async create(data: {
    title: string;
    order?: number;
    authorId: string;
  }) {
    let newOrder: number;
    if (data.order === undefined) {
      const [maxOrderResult] = await this.db
        .select({ value: max(columns.order) })
        .from(columns)
        .where(eq(columns.authorId, data.authorId));
      newOrder = (maxOrderResult?.value ?? -1) + 1;
    } else {
      newOrder = data.order;
      await this.db
        .update(columns)
        .set({ order: sql`${columns.order} + 1` })
        .where(
          and(
            eq(columns.authorId, data.authorId),
            gte(columns.order, newOrder),
          ),
        );
    }
    const [newColumn] = await this.db
      .insert(columns)
      .values({
        id: createId(),
        title: data.title,
        order: newOrder,
        authorId: data.authorId,
      })
      .returning();
    return newColumn;
  }
  
  async findAll(
    authorId: string,
    status?: TaskStatus,
    searchQuery?: string,
  ) {
    const taskConditions = [eq(tasks.authorId, authorId)];
    if (status) {
      taskConditions.push(eq(tasks.status, status));
    }
    if (searchQuery) {
      const searchTerm = `%${searchQuery}%`;
      taskConditions.push(
        sql`(${tasks.title} ilike ${searchTerm}) OR (coalesce(${tasks.description}, '') ilike ${searchTerm})`
      );
    }

    const allColumns = await this.db.query.columns.findMany({
      where: eq(columns.authorId, authorId),
      orderBy: [asc(columns.order)],
      with: {
        tasks: {
          where: and(...taskConditions),
          orderBy: [asc(tasks.order), asc(tasks.createdAt)],
        },
      },
    });

    return allColumns;
  }
  
  async findOne(id: string, authorId: string) {
    const [column] = await this.db
      .select()
      .from(columns)
      .where(and(eq(columns.id, id), eq(columns.authorId, authorId)));
    if (!column) {
      throw new NotFoundException(`Coluna com ID ${id} não encontrada.`);
    }
    return column;
  }
  
  async update(id: string, updateColumnDto: UpdateColumnDto, authorId: string) {
    const columnToMove = await this.findOne(id, authorId);
    const newOrder = updateColumnDto.order;
    const isReordering =
      newOrder !== undefined && newOrder !== columnToMove.order;

    if (!isReordering) {
      const [updatedColumn] = await this.db
        .update(columns)
        .set(updateColumnDto)
        .where(eq(columns.id, id))
        .returning();
      if (!updatedColumn) {
        throw new NotFoundException(
          `Coluna com ID ${id} não encontrada durante atualização.`,
        );
      }
      return updatedColumn;
    }

    await this.db.transaction(async (tx) => {
      const oldOrder = columnToMove.order;
      if (newOrder < oldOrder) {
        await tx
          .update(columns)
          .set({ order: sql`${columns.order} + 1` })
          .where(
            and(
              eq(columns.authorId, authorId),
              gte(columns.order, newOrder),
              lt(columns.order, oldOrder),
            ),
          );
      } else {
        await tx
          .update(columns)
          .set({ order: sql`${columns.order} - 1` })
          .where(
            and(
              eq(columns.authorId, authorId),
              gt(columns.order, oldOrder),
              lte(columns.order, newOrder),
            ),
          );
      }
      await tx
        .update(columns)
        .set(updateColumnDto)
        .where(eq(columns.id, id));
    });

    const [resultColumn] = await this.db
      .select()
      .from(columns)
      .where(eq(columns.id, id));
    return resultColumn;
  }

  async remove(id: string, authorId: string) {
    const columnToDelete = await this.findOne(id, authorId);
    await this.db.transaction(async (tx) => {
      const [deletedColumn] = await tx
        .delete(columns)
        .where(eq(columns.id, id))
        .returning();
      if (!deletedColumn) {
        throw new NotFoundException(`Coluna com ID ${id} não encontrada.`);
      }
      await tx
        .update(columns)
        .set({ order: sql`${columns.order} - 1` })
        .where(
          and(
            eq(columns.authorId, authorId),
            gt(columns.order, columnToDelete.order),
          ),
        );
    });
    return;
  }
}