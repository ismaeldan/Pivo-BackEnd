import {
  Inject,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DB } from 'src/db/db.module';
import type { DbType } from 'src/db/db.module';
import { users } from 'src/db/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject(DB) private db: DbType) {}

  async create(createUserDto: CreateUserDto) {
    
    const [existingUser] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, createUserDto.email));

    if (existingUser) {
      throw new ConflictException('Um usuário com este e-mail já existe.');
    }
    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    
    const [newUser] = await this.db
      .insert(users)
      .values({
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        avatarUrl: users.avatarUrl,
        createdAt: users.createdAt,
      });

    return newUser;
  }

  async findOne(id: string) {
    const [user] = await this.db.query.users.findMany({
      where: eq(users.id, id),
      columns: {
        password: false,
      },
    });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
  }

  async findOneByEmail(email: string) {
    const [user] = await this.db.query.users.findMany({
      where: eq(users.email, email),
    });
    return user; 
  }
  
  async update(id: string, updateUserDto: UpdateUserDto) {
    const [currentUser] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id));

    if (!currentUser) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    const dataToUpdate: Partial<typeof users.$inferInsert> = {};

    if (updateUserDto.name) {
      dataToUpdate.name = updateUserDto.name;
    }

    if (updateUserDto.email && updateUserDto.email !== currentUser.email) {
      const [existingUser] = await this.db
        .select()
        .from(users)
        .where(eq(users.email, updateUserDto.email));
      
      if (existingUser) {
        throw new ConflictException('O novo e-mail fornecido já está em uso.');
      }
      dataToUpdate.email = updateUserDto.email;
    }
    
    if (updateUserDto.password) {
      const saltRounds = 10;
      dataToUpdate.password = await bcrypt.hash(
        updateUserDto.password,
        saltRounds,
      );
    }
    
    if (Object.keys(dataToUpdate).length === 0) {
      return this.findOne(id);
    }
    
    const [updatedUser] = await this.db
      .update(users)
      .set(dataToUpdate)
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        avatarUrl: users.avatarUrl,
        createdAt: users.createdAt,
      });

    return updatedUser;
  }
}

