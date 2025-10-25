import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DB } from 'src/db/db.module';
import type { DbType } from 'src/db/db.module';
import { tasks } from 'src/db/schema';
import { desc, eq } from 'drizzle-orm';

@Injectable()
export class TasksService {
  constructor(@Inject(DB) private db: DbType) {}
  
  async create(data: {
    title: string;
    description?: string;
    authorId: string;
    columnId: string;
  }) {
    const [newTask] = await this.db
      .insert(tasks)
      .values({
        title: data.title,
        description: data.description,
        authorId: data.authorId,
        columnId: data.columnId,
      })
      .returning();

    return newTask;
  }
  
  async findAll() {
    
    const allTasks = await this.db.query.tasks.findMany({
      orderBy: [desc(tasks.createdAt)],
    });
    return allTasks;
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
}