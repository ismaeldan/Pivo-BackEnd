import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from 'src/db/schema';
declare class FindAllTasksDto {
    status?: TaskStatus;
}
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        order: number;
        authorId: string;
        description: string | null;
        columnId: string;
        status: "pending" | "in_progress" | "completed";
    }>;
    findAll(queryParams: FindAllTasksDto): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        order: number;
        authorId: string;
        description: string | null;
        columnId: string;
        status: "pending" | "in_progress" | "completed";
    }[]>;
    searchTasks(searchQuery: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date | null;
        authorId: string;
        columnId: string;
        order: number;
        status: "pending" | "in_progress" | "completed";
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        order: number;
        authorId: string;
        description: string | null;
        columnId: string;
        status: "pending" | "in_progress" | "completed";
    }>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date | null;
        authorId: string;
        columnId: string;
        order: number;
        status: "pending" | "in_progress" | "completed";
    }>;
    remove(id: string): Promise<void>;
}
export {};
