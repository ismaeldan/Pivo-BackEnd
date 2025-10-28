import { UpdateTaskDto } from './dto/update-task.dto';
import type { DbType } from 'src/db/db.module';
import { TaskStatus } from 'src/db/schema';
export declare class TasksService {
    private db;
    constructor(db: DbType);
    create(data: {
        title: string;
        description?: string;
        authorId: string;
        columnId: string;
        order?: number;
        status?: TaskStatus;
    }): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        order: number;
        authorId: string;
        description: string | null;
        columnId: string;
        status: "pending" | "in_progress" | "completed";
    }>;
    findAll(authorId: string, status?: TaskStatus): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        order: number;
        authorId: string;
        description: string | null;
        columnId: string;
        status: "pending" | "in_progress" | "completed";
    }[]>;
    search(query: string, authorId: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date | null;
        authorId: string;
        columnId: string;
        order: number;
        status: "pending" | "in_progress" | "completed";
    }[]>;
    findOne(id: string, authorId: string): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        order: number;
        authorId: string;
        description: string | null;
        columnId: string;
        status: "pending" | "in_progress" | "completed";
    }>;
    update(id: string, updateTaskDto: UpdateTaskDto, authorId: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date | null;
        authorId: string;
        columnId: string;
        order: number;
        status: "pending" | "in_progress" | "completed";
    }>;
    remove(id: string, authorId: string): Promise<void>;
}
