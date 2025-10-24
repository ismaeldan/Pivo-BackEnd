import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import type { DbType } from 'src/db/db.module';
export declare class ColumnsService {
    private db;
    constructor(db: DbType);
    create(createColumnDto: CreateColumnDto): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        order: number;
    }>;
    findAll(): Promise<{
        id: string;
        title: string;
        order: number;
        createdAt: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        order: number;
        createdAt: Date | null;
    }>;
    update(id: string, updateColumnDto: UpdateColumnDto): Promise<{
        id: string;
        title: string;
        order: number;
        createdAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        order: number;
    }>;
}
