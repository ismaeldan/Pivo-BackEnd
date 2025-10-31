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
        title: string;
        description: string | null;
        columnId: string;
        order: number;
        status: "pending" | "in_progress" | "completed";
        id: string;
        createdAt: Date | null;
        authorId: string;
    }>;
    findAll(queryParams: FindAllTasksDto, req: AuthenticatedRequest): Promise<{
        title: string;
        description: string | null;
        columnId: string;
        order: number;
        status: "pending" | "in_progress" | "completed";
        id: string;
        createdAt: Date | null;
        authorId: string;
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
        title: string;
        description: string | null;
        columnId: string;
        order: number;
        status: "pending" | "in_progress" | "completed";
        id: string;
        createdAt: Date | null;
        authorId: string;
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
