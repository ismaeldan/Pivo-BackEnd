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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const db_module_1 = require("../db/db.module");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
let TasksService = class TasksService {
    db;
    constructor(db) {
        this.db = db;
    }
    async create(data) {
        let newOrder;
        if (data.order === undefined) {
            const [maxOrderResult] = await this.db
                .select({ value: (0, drizzle_orm_1.max)(schema_1.tasks.order) })
                .from(schema_1.tasks)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.tasks.authorId, data.authorId), (0, drizzle_orm_1.eq)(schema_1.tasks.columnId, data.columnId)));
            newOrder = (maxOrderResult?.value ?? -1) + 1;
        }
        else {
            newOrder = data.order;
            await this.db
                .update(schema_1.tasks)
                .set({ order: (0, drizzle_orm_1.sql) `${schema_1.tasks.order} + 1` })
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.tasks.authorId, data.authorId), (0, drizzle_orm_1.eq)(schema_1.tasks.columnId, data.columnId), (0, drizzle_orm_1.gte)(schema_1.tasks.order, newOrder)));
        }
        const [newTask] = await this.db
            .insert(schema_1.tasks)
            .values({
            title: data.title,
            description: data.description,
            authorId: data.authorId,
            columnId: data.columnId,
            order: newOrder,
            status: data.status ?? 'pending',
        })
            .returning();
        return newTask;
    }
    async findAll(authorId, status) {
        const conditions = [(0, drizzle_orm_1.eq)(schema_1.tasks.authorId, authorId)];
        if (status) {
            conditions.push((0, drizzle_orm_1.eq)(schema_1.tasks.status, status));
        }
        const userTasks = await this.db.query.tasks.findMany({
            where: (0, drizzle_orm_1.and)(...conditions),
            orderBy: [(0, drizzle_orm_1.asc)(schema_1.tasks.order), (0, drizzle_orm_1.asc)(schema_1.tasks.createdAt)],
        });
        return userTasks;
    }
    async search(query, authorId) {
        const searchTerm = `%${query}%`;
        const foundTasks = await this.db
            .select()
            .from(schema_1.tasks)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.tasks.authorId, authorId), (0, drizzle_orm_1.or)((0, drizzle_orm_1.ilike)(schema_1.tasks.title, searchTerm), (0, drizzle_orm_1.ilike)(schema_1.tasks.description, searchTerm))))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.tasks.createdAt));
        return foundTasks;
    }
    async findOne(id, authorId) {
        const [task] = await this.db.query.tasks.findMany({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.tasks.id, id), (0, drizzle_orm_1.eq)(schema_1.tasks.authorId, authorId)),
        });
        if (!task) {
            throw new common_1.NotFoundException(`Task com ID ${id} não encontrada.`);
        }
        return task;
    }
    async update(id, updateTaskDto, authorId) {
        const taskToMove = await this.findOne(id, authorId);
        const newOrder = updateTaskDto.order;
        const newColumnId = updateTaskDto.columnId;
        const isReordering = (newOrder !== undefined && newOrder !== taskToMove.order) ||
            (newColumnId !== undefined && newColumnId !== taskToMove.columnId);
        if (!isReordering) {
            const [updatedTask] = await this.db
                .update(schema_1.tasks)
                .set(updateTaskDto)
                .where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id))
                .returning();
            if (!updatedTask) {
                throw new common_1.NotFoundException(`Task com ID ${id} não encontrada.`);
            }
            return updatedTask;
        }
        const finalOrder = newOrder ?? taskToMove.order;
        const finalColumnId = newColumnId ?? taskToMove.columnId;
        await this.db.transaction(async (tx) => {
            await tx
                .update(schema_1.tasks)
                .set({ order: (0, drizzle_orm_1.sql) `${schema_1.tasks.order} - 1` })
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.tasks.authorId, authorId), (0, drizzle_orm_1.eq)(schema_1.tasks.columnId, taskToMove.columnId), (0, drizzle_orm_1.gt)(schema_1.tasks.order, taskToMove.order)));
            await tx
                .update(schema_1.tasks)
                .set({ order: (0, drizzle_orm_1.sql) `${schema_1.tasks.order} + 1` })
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.tasks.authorId, authorId), (0, drizzle_orm_1.eq)(schema_1.tasks.columnId, finalColumnId), (0, drizzle_orm_1.gte)(schema_1.tasks.order, finalOrder), (0, drizzle_orm_1.not)((0, drizzle_orm_1.eq)(schema_1.tasks.id, id))));
            await tx
                .update(schema_1.tasks)
                .set({
                ...updateTaskDto,
                order: finalOrder,
                columnId: finalColumnId,
            })
                .where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id));
        });
        const [resultTask] = await this.db
            .select()
            .from(schema_1.tasks)
            .where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id));
        return resultTask;
    }
    async remove(id, authorId) {
        const taskToDelete = await this.findOne(id, authorId);
        await this.db.transaction(async (tx) => {
            const [deletedTask] = await tx
                .delete(schema_1.tasks)
                .where((0, drizzle_orm_1.eq)(schema_1.tasks.id, id))
                .returning();
            if (!deletedTask) {
                throw new common_1.NotFoundException(`Task com ID ${id} não encontrada.`);
            }
            await tx
                .update(schema_1.tasks)
                .set({ order: (0, drizzle_orm_1.sql) `${schema_1.tasks.order} - 1` })
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.tasks.authorId, authorId), (0, drizzle_orm_1.eq)(schema_1.tasks.columnId, taskToDelete.columnId), (0, drizzle_orm_1.gt)(schema_1.tasks.order, taskToDelete.order)));
        });
        return;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(db_module_1.DB)),
    __metadata("design:paramtypes", [Object])
], TasksService);
//# sourceMappingURL=tasks.service.js.map