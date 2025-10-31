import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DB } from 'src/db/db.module';
import type { DbType } from 'src/db/db.module';
import { tasks, TaskStatus } from 'src/db/schema';
import { desc, eq, and, or, ilike, max, asc, sql, gt, gte, not } from 'drizzle-orm';

@Injectable()
export class TasksService {
  constructor(@Inject(DB) private db: DbType) {}
  
  async create(data: {
    title: string;
    description?: string;
    authorId: string;
    columnId: string;
    order?: number; //
    status?: TaskStatus; //
  }) {
    let newOrder: number;
    
    if (data.order === undefined) {
      const [maxOrderResult] = await this.db
        .select({ value: max(tasks.order) })
        .from(tasks)
        .where(
          and(
            eq(tasks.authorId, data.authorId),
            eq(tasks.columnId, data.columnId),
          ),
        );
        
      newOrder = (maxOrderResult?.value ?? -1) + 1;
    } else {
      
      newOrder = data.order;
      await this.db
        .update(tasks)
        .set({ order: sql`${tasks.order} + 1` })
        .where(
          and(
            eq(tasks.authorId, data.authorId),
            eq(tasks.columnId, data.columnId),
            gte(tasks.order, newOrder),
          ),
        );
    }
    
    const [newTask] = await this.db
      .insert(tasks)
      .values({
        title: data.title,
        description: data.description,
        authorId: data.authorId,
        columnId: data.columnId,
        order: newOrder,
        status: data.status ?? 'pending',
      })
      .returning();

    return newTask;
  }
  
  async findAll(authorId: string, status?: TaskStatus) {
    const conditions = [eq(tasks.authorId, authorId)];

    if (status) {
      conditions.push(eq(tasks.status, status));
    }

    const userTasks = await this.db.query.tasks.findMany({
      where: and(...conditions), 
      orderBy: [asc(tasks.order), asc(tasks.createdAt)],
    });
    
    return userTasks;
  }

  async search(query: string, authorId: string) {
  const searchTerm = `%${query}%`; 

  const foundTasks = await this.db
    .select()
    .from(tasks)
    .where(
      and(
        eq(tasks.authorId, authorId),
        or(
          ilike(tasks.title, searchTerm),
          ilike(tasks.description, searchTerm) 
        )
      )
    )
    .orderBy(desc(tasks.createdAt)); 

  return foundTasks;
  }

  async findOne(id: string, authorId: string) {
    const [task] = await this.db.query.tasks.findMany({
      where: and(
        eq(tasks.id, id),
        eq(tasks.authorId, authorId)
      ),
    });

    if (!task) {
      throw new NotFoundException(`Task com ID ${id} não encontrada.`);
    }
    return task;
  }
  
  async update(id: string, updateTaskDto: UpdateTaskDto, authorId: string) {
    
    const taskToMove = await this.findOne(id, authorId); //

    const newOrder = updateTaskDto.order;
    const newColumnId = updateTaskDto.columnId;
    
    const isReordering =
      (newOrder !== undefined && newOrder !== taskToMove.order) ||
      (newColumnId !== undefined && newColumnId !== taskToMove.columnId);
      
    if (!isReordering) {
      const [updatedTask] = await this.db
        .update(tasks)
        .set(updateTaskDto)
        .where(eq(tasks.id, id))
        .returning();

      if (!updatedTask) {
        throw new NotFoundException(`Task com ID ${id} não encontrada.`);
      }
      return updatedTask;
    }
    
    const finalOrder = newOrder ?? taskToMove.order;
    const finalColumnId = newColumnId ?? taskToMove.columnId;

    await this.db.transaction(async (tx) => {
      
      await tx
        .update(tasks)
        .set({ order: sql`${tasks.order} - 1` })
        .where(
          and(
            eq(tasks.authorId, authorId),
            eq(tasks.columnId, taskToMove.columnId),
            gt(tasks.order, taskToMove.order),
          ),
        );
        
      await tx
        .update(tasks)
        .set({ order: sql`${tasks.order} + 1` })
        .where(
          and(
            eq(tasks.authorId, authorId),
            eq(tasks.columnId, finalColumnId),
            gte(tasks.order, finalOrder),
            not(eq(tasks.id, id))
          ),
        );
        
      await tx
        .update(tasks)
        .set({
          ...updateTaskDto,
          order: finalOrder,
          columnId: finalColumnId,
        })
        .where(eq(tasks.id, id));
    });

    const [resultTask] = await this.db
      .select()
      .from(tasks)
      .where(eq(tasks.id, id));

    return resultTask;
  }

  async remove(id: string, authorId: string) {
    
    const taskToDelete = await this.findOne(id, authorId);
    
    await this.db.transaction(async (tx) => {
      
      const [deletedTask] = await tx
        .delete(tasks)
        .where(eq(tasks.id, id))
        .returning(); //

      if (!deletedTask) {
        throw new NotFoundException(`Task com ID ${id} não encontrada.`);
      }
      
      await tx
        .update(tasks)
        .set({ order: sql`${tasks.order} - 1` })
        .where(
          and(
            eq(tasks.authorId, authorId),
            eq(tasks.columnId, taskToDelete.columnId),
            gt(tasks.order, taskToDelete.order),
          ),
        );
    });

    return; //
  }
}