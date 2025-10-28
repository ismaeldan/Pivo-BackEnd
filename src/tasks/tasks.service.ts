import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DB } from 'src/db/db.module';
import type { DbType } from 'src/db/db.module';
import { tasks, TaskStatus } from 'src/db/schema';
import { desc, eq, and, or, ilike } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core'

@Injectable()
export class TasksService {
  constructor(@Inject(DB) private db: DbType) {}
  
  async create(data: {
    title: string;
    description?: string;
    authorId: string;
    columnId: string;
    order?: number;
  }) {
    const [newTask] = await this.db
      .insert(tasks)
      .values({
        title: data.title,
        description: data.description,
        authorId: data.authorId,
        columnId: data.columnId,
        order: data.order,
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
      orderBy: [desc(tasks.createdAt)],
    });
    
    return userTasks;
  }
  async findOne(id: string) {
    const [task] = await this.db.query.tasks.findMany({
      where: eq(tasks.id, id),
    });

    if (!task) {
      throw new NotFoundException(`Task com ID ${id} não encontrada.`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
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

  async remove(id: string) {
    const [deletedTask] = await this.db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();

    if (!deletedTask) {
      throw new NotFoundException(`Task com ID ${id} não encontrada.`);
    }
    return;
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
}