import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { TaskStatus } from 'src/db/schema';
interface AuthenticatedRequest extends Request {
    user: {
        userId: string;
        email: string;
    };
}
declare class FindAllTasksDto {
    status?: TaskStatus;
    q?: string;
}
export declare class ColumnsController {
    private readonly columnsService;
    constructor(columnsService: ColumnsService);
    create(createColumnDto: CreateColumnDto, req: AuthenticatedRequest): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        order: number;
        authorId: string;
    }>;
    findAll(req: AuthenticatedRequest, queryParams: FindAllTasksDto): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        order: number;
        authorId: string;
        tasks: {
            id: string;
            createdAt: Date | null;
            title: string;
            order: number;
            authorId: string;
            description: string | null;
            columnId: string;
            status: "pending" | "in_progress" | "completed";
        }[];
    }[]>;
    findOne(id: string, req: AuthenticatedRequest): Promise<{
        id: string;
        title: string;
        order: number;
        createdAt: Date | null;
        authorId: string;
    }>;
    update(id: string, updateColumnDto: UpdateColumnDto, req: AuthenticatedRequest): Promise<{
        id: string;
        title: string;
        order: number;
        createdAt: Date | null;
        authorId: string;
    }>;
    remove(id: string, req: AuthenticatedRequest): Promise<void>;
}
export {};
