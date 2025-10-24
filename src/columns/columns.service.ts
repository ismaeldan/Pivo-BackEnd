// pivo-backend/src/columns/columns.service.ts

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { DB, DbType } from 'src/db/db.module'; // 1. Importar o DB
import { columns } from 'src/db/schema'; // 2. Importar a tabela 'columns'
import { asc, eq } from 'drizzle-orm'; // 3. Importar operadores Drizzle
import { createId } from '@paralleldrive/cuid2'; // 4. Importar o gerador de IDs

@Injectable()
export class ColumnsService {
  // 5. Injetar o banco de dados
  constructor(@Inject(DB) private db: DbType) {}

  async create(createColumnDto: CreateColumnDto) {
    const newId = createId(); // Gerar um novo CUID

    // Se a ordem não for fornecida, podemos calcular a próxima ordem disponível
    // (Por agora, vamos apenas usar 0 se não for fornecida)
    const order = createColumnDto.order ?? 0;

    const [newColumn] = await this.db
      .insert(columns)
      .values({
        id: newId,
        title: createColumnDto.title,
        order: order,
      })
      .returning();

    return newColumn;
  }

  async findAll() {
    // Retorna todas as colunas, ordenadas pelo campo 'order'
    const allColumns = await this.db
      .select()
      .from(columns)
      .orderBy(asc(columns.order));

    return allColumns;
  }

  // --- Métodos CRUD completos (mesmo que não os usemos agora) ---

  async findOne(id: string) {
    const [column] = await this.db
      .select()
      .from(columns)
      .where(eq(columns.id, id));

    if (!column) {
      throw new NotFoundException(`Coluna com ID ${id} não encontrada.`);
    }

    return column;
  }

  async update(id: string, updateColumnDto: UpdateColumnDto) {
    // Verifica se a coluna existe
    await this.findOne(id);

    const [updatedColumn] = await this.db
      .update(columns)
      .set(updateColumnDto)
      .where(eq(columns.id, id))
      .returning();

    return updatedColumn;
  }

  async remove(id: string) {
    // Verifica se a coluna existe
    await this.findOne(id);

    const [deletedColumn] = await this.db
      .delete(columns)
      .where(eq(columns.id, id))
      .returning();

    return deletedColumn;
  }
}