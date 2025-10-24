import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DB } from 'src/db/db.module';
import type { DbType } from 'src/db/db.module';
import { tasks } from 'src/db/schema';
import { desc, eq } from 'drizzle-orm';

@Injectable()
export class TasksService {
  constructor(@Inject(DB) private db: DbType) {}

  async create(createTaskDto: CreateTaskDto) {

    const [newTask] = await this.db
      .insert(tasks)
      .values({
        title: createTaskDto.title,
        description: createTaskDto.description,
        authorId: createTaskDto.authorId,
        columnId: createTaskDto.columnId,
      })
      .returning();
    return newTask;
  }

  async findAll() {
    const allTasks = await this.db
      .select()
      .from(tasks)
      .orderBy(desc(tasks.createdAt));
      
    return allTasks;
  }

  async findOne(id: string) {
    const [task] = await this.db.select().from(tasks).where(eq(tasks.id, id));

    if (!task) {
      throw new NotFoundException(`Task com ID ${id} não encontrada.`);
    }

    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);

    const [updatedTask] = await this.db
      .update(tasks)
      .set(updateTaskDto)
      .where(eq(tasks.id, id))
      .returning();

    return updatedTask;
  }

  async remove(id: string) {
    await this.findOne(id);

    const [deletedTask] = await this.db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();

    return deletedTask;
  }
}