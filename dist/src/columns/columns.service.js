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
    async create(createColumnDto) {
        const newId = (0, cuid2_1.createId)();
        const order = createColumnDto.order ?? 0;
        const [newColumn] = await this.db
            .insert(schema_1.columns)
            .values({
            id: newId,
            title: createColumnDto.title,
            order: order,
        })
            .returning();
        return newColumn;
    }
    async findAll() {
        const allColumns = await this.db
            .select()
            .from(schema_1.columns)
            .orderBy((0, drizzle_orm_1.asc)(schema_1.columns.order));
        return allColumns;
    }
    async findOne(id) {
        const [column] = await this.db
            .select()
            .from(schema_1.columns)
            .where((0, drizzle_orm_1.eq)(schema_1.columns.id, id));
        if (!column) {
            throw new common_1.NotFoundException(`Coluna com ID ${id} não encontrada.`);
        }
        return column;
    }
    async update(id, updateColumnDto) {
        await this.findOne(id);
        const [updatedColumn] = await this.db
            .update(schema_1.columns)
            .set(updateColumnDto)
            .where((0, drizzle_orm_1.eq)(schema_1.columns.id, id))
            .returning();
        return updatedColumn;
    }
    async remove(id) {
        await this.findOne(id);
        const [deletedColumn] = await this.db
            .delete(schema_1.columns)
            .where((0, drizzle_orm_1.eq)(schema_1.columns.id, id))
            .returning();
        return deletedColumn;
    }
};
exports.ColumnsService = ColumnsService;
exports.ColumnsService = ColumnsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(db_module_1.DB)),
    __metadata("design:paramtypes", [Object])
], ColumnsService);
//# sourceMappingURL=columns.service.js.map