"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnsService = void 0;
const common_1 = require("@nestjs/common");
const db_module_1 = require("../db/db.module");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const cuid2_1 = require("@paralleldrive/cuid2");
let ColumnsService = class ColumnsService {
    db;
    constructor(db) {
        this.db = db;
    }
    async create(data) {
        let newOrder;
        if (data.order === undefined) {
            const [maxOrderResult] = await this.db
                .select({ value: (0, drizzle_orm_1.max)(schema_1.columns.order) })
                .from(schema_1.columns)
                .where((0, drizzle_orm_1.eq)(schema_1.columns.authorId, data.authorId));
            newOrder = (maxOrderResult?.value ?? -1) + 1;
        }
        else {
            newOrder = data.order;
            await this.db
                .update(schema_1.columns)
                .set({ order: (0, drizzle_orm_1.sql) `${schema_1.columns.order} + 1` })
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.columns.authorId, data.authorId), (0, drizzle_orm_1.gte)(schema_1.columns.order, newOrder)));
        }
        const [newColumn] = await this.db
            .insert(schema_1.columns)
            .values({
            id: (0, cuid2_1.createId)(),
            title: data.title,
            order: newOrder,
            authorId: data.authorId,
        })
            .returning();
        return newColumn;
    }
    async findAll(authorId) {
        const allColumns = await this.db
            .select()
            .from(schema_1.columns)
            .where((0, drizzle_orm_1.eq)(schema_1.columns.authorId, authorId))
            .orderBy((0, drizzle_orm_1.asc)(schema_1.columns.order));
        return allColumns;
    }
    async findOne(id, authorId) {
        const [column] = await this.db
            .select()
            .from(schema_1.columns)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.columns.id, id), (0, drizzle_orm_1.eq)(schema_1.columns.authorId, authorId)));
        if (!column) {
            throw new common_1.NotFoundException(`Coluna com ID ${id} não encontrada.`);
        }
        return column;
    }
    async update(id, updateColumnDto, authorId) {
        const columnToMove = await this.findOne(id, authorId);
        const newOrder = updateColumnDto.order;
        const isReordering = newOrder !== undefined && newOrder !== columnToMove.order;
        if (!isReordering) {
            const [updatedColumn] = await this.db
                .update(schema_1.columns)
                .set(updateColumnDto)
                .where((0, drizzle_orm_1.eq)(schema_1.columns.id, id))
                .returning();
            if (!updatedColumn) {
                throw new common_1.NotFoundException(`Coluna com ID ${id} não encontrada durante atualização.`);
            }
            return updatedColumn;
        }
        await this.db.transaction(async (tx) => {
            const oldOrder = columnToMove.order;
            if (newOrder < oldOrder) {
                await tx
                    .update(schema_1.columns)
                    .set({ order: (0, drizzle_orm_1.sql) `${schema_1.columns.order} + 1` })
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.columns.authorId, authorId), (0, drizzle_orm_1.gte)(schema_1.columns.order, newOrder), (0, drizzle_orm_1.lt)(schema_1.columns.order, oldOrder)));
            }
            else {
                await tx
                    .update(schema_1.columns)
                    .set({ order: (0, drizzle_orm_1.sql) `${schema_1.columns.order} - 1` })
                    .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.columns.authorId, authorId), (0, drizzle_orm_1.gt)(schema_1.columns.order, oldOrder), (0, drizzle_orm_1.lte)(schema_1.columns.order, newOrder)));
            }
            await tx
                .update(schema_1.columns)
                .set(updateColumnDto)
                .where((0, drizzle_orm_1.eq)(schema_1.columns.id, id));
        });
        const [resultColumn] = await this.db
            .select()
            .from(schema_1.columns)
            .where((0, drizzle_orm_1.eq)(schema_1.columns.id, id));
        return resultColumn;
    }
    async remove(id, authorId) {
        const columnToDelete = await this.findOne(id, authorId);
        await this.db.transaction(async (tx) => {
            const [deletedColumn] = await tx
                .delete(schema_1.columns)
                .where((0, drizzle_orm_1.eq)(schema_1.columns.id, id))
                .returning();
            if (!deletedColumn) {
                throw new common_1.NotFoundException(`Coluna com ID ${id} não encontrada.`);
            }
            await tx
                .update(schema_1.columns)
                .set({ order: (0, drizzle_orm_1.sql) `${schema_1.columns.order} - 1` })
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.columns.authorId, authorId), (0, drizzle_orm_1.gt)(schema_1.columns.order, columnToDelete.order)));
        });
        return;
    }
};
exports.ColumnsService = ColumnsService;
exports.ColumnsService = ColumnsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(db_module_1.DB)),
    __metadata("design:paramtypes", [Object])
], ColumnsService);
//# sourceMappingURL=columns.service.js.map