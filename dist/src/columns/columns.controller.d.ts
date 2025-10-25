import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
export declare class ColumnsController {
    private readonly columnsService;
    constructor(columnsService: ColumnsService);
    create(createColumnDto: CreateColumnDto): Promise<{
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
