import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { DbType } from 'src/db/db.module';
export declare class ColumnsService {
    private db;
    constructor(db: DbType);
    create(createColumnDto: CreateColumnDto): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, updateColumnDto: UpdateColumnDto): Promise<any>;
    remove(id: string): Promise<any>;
}
