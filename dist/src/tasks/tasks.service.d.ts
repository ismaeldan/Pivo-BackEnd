import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DbType } from 'src/db/db.module';
export declare class TasksService {
    private db;
    constructor(db: DbType);
    create(createTaskDto: CreateTaskDto): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        description: string | null;
        authorId: string;
        columnId: string;
    }>;
    findAll(): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date | null;
        authorId: string;
        columnId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date | null;
        authorId: string;
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
    remove(id: string): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        description: string | null;
        authorId: string;
        columnId: string;
    }>;
}
