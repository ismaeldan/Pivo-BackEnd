import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_PROVIDER_TOKEN } from 'src/db/drizzle.provider';
import type { DrizzleDatabase } from 'src/db/types';
@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE_PROVIDER_TOKEN) private db: DrizzleDatabase,
  ) {}

  async findAll() {
    const users = await this.db.query.users.findMany();
    return users;
  }

  create(createUserDto: any) {
    return 'This action adds a new user';
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}