import { UpdateTaskDto } from './dto/update-task.dto';
import type { DbType } from 'src/db/db.module';
export declare class TasksService {
    private db;
    constructor(db: DbType);
    create(data: {
        title: string;
        description?: string;
        authorId: string;
        columnId: string;
    }): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        authorId: string;
        description: string | null;
        columnId: string;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        authorId: string;
        description: string | null;
        columnId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        authorId: string;
        description: string | null;
        columnId: string;
    }>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date | null;
        authorId: string;
        columnId: string;
    }>;
    remove(id: string): Promise<void>;
}
