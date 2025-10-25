import { UpdateColumnDto } from './dto/update-column.dto';
import type { DbType } from 'src/db/db.module';
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
    findAll(): Promise<{
        id: string;
        title: string;
        order: number;
        createdAt: Date | null;
        authorId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        order: number;
        createdAt: Date | null;
        authorId: string;
    }>;
    update(id: string, updateColumnDto: UpdateColumnDto): Promise<{
        id: string;
        title: string;
        order: number;
        createdAt: Date | null;
        authorId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        order: number;
        authorId: string;
    }>;
}
