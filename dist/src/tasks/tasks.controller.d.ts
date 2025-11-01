import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from 'src/db/schema';
interface AuthenticatedRequest extends Request {
    user: {
        userId: string;
        email: string;
    };
}
declare class FindAllTasksDto {
    status?: TaskStatus;
}
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto, req: AuthenticatedRequest): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        order: number;
        authorId: string;
        description: string | null;
        columnId: string;
        status: "pending" | "in_progress" | "completed";
    }>;
    findAll(queryParams: FindAllTasksDto, req: AuthenticatedRequest): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        order: number;
        authorId: string;
        description: string | null;
        columnId: string;
        status: "pending" | "in_progress" | "completed";
    }[]>;
    searchTasks(searchQuery: string, req: AuthenticatedRequest): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date | null;
        authorId: string;
        columnId: string;
        order: number;
        status: "pending" | "in_progress" | "completed";
    }[]>;
    findOne(id: string, req: AuthenticatedRequest): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        order: number;
        authorId: string;
        description: string | null;
        columnId: string;
        status: "pending" | "in_progress" | "completed";
    }>;
    update(id: string, updateTaskDto: UpdateTaskDto, req: AuthenticatedRequest): Promise<{
        id: string;
        title: string;
        description: string | null;
        createdAt: Date | null;
        authorId: string;
        columnId: string;
        order: number;
        status: "pending" | "in_progress" | "completed";
    }>;
    remove(id: string, req: AuthenticatedRequest): Promise<void>;
}
export {};
