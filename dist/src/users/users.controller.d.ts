import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string | null;
        email: string;
        avatarUrl: string | null;
        createdAt: Date | null;
    }>;
    findAll(): Promise<{
        id: string;
        name: string | null;
        email: string;
        avatarUrl: string | null;
        createdAt: Date | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        name: string | null;
        email: string;
        avatarUrl: string | null;
        createdAt: Date | null;
    }>;
}
