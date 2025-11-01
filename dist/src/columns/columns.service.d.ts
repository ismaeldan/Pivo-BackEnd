import { UpdateColumnDto } from './dto/update-column.dto';
import type { DbType } from 'src/db/db.module';
import { TaskStatus } from 'src/db/schema';
export declare class ColumnsService {
    private db;
    constructor(db: DbType);
    create(data: {
        title: string;
        order?: number;
        authorId: string;
    }): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        order: number;
        authorId: string;
    }>;
    findAll(authorId: string, status?: TaskStatus, searchQuery?: string): Promise<{
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
    findOne(id: string, authorId: string): Promise<{
        id: string;
        title: string;
        order: number;
        createdAt: Date | null;
        authorId: string;
    }>;
    update(id: string, updateColumnDto: UpdateColumnDto, authorId: string): Promise<{
        id: string;
        title: string;
        order: number;
        createdAt: Date | null;
        authorId: string;
    }>;
    remove(id: string, authorId: string): Promise<void>;
}
