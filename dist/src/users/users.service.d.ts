import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { DbType } from 'src/db/db.module';
export declare class UsersService {
    private db;
    constructor(db: DbType);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string | null;
        email: string;
        avatarUrl: string | null;
        createdAt: Date | null;
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string | null;
        email: string;
        avatarUrl: string | null;
        createdAt: Date | null;
    }>;
    findOneByEmail(email: string): Promise<{
        id: string;
        name: string | null;
        email: string;
        password: string;
        avatarUrl: string | null;
        createdAt: Date | null;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        name: string | null;
        email: string;
        avatarUrl: string | null;
        createdAt: Date | null;
    }>;
}
