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
exports.ColumnsController = void 0;
const common_1 = require("@nestjs/common");
const columns_service_1 = require("./columns.service");
const create_column_dto_1 = require("./dto/create-column.dto");
const update_column_dto_1 = require("./dto/update-column.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ColumnsController = class ColumnsController {
    columnsService;
    constructor(columnsService) {
        this.columnsService = columnsService;
    }
    create(createColumnDto, req) {
        const userId = req.user.userId;
        const columnDataComAutor = {
            ...createColumnDto,
            authorId: userId,
        };
        return this.columnsService.create(columnDataComAutor);
    }
    findAll(req) {
        const userId = req.user.userId;
        return this.columnsService.findAll(userId);
    }
    findOne(id, req) {
        const userId = req.user.userId;
        return this.columnsService.findOne(id, userId);
    }
    update(id, updateColumnDto, req) {
        const userId = req.user.userId;
        return this.columnsService.update(id, updateColumnDto, userId);
    }
    remove(id, req) {
        const userId = req.user.userId;
        return this.columnsService.remove(id, userId);
    }
};
exports.ColumnsController = ColumnsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_column_dto_1.CreateColumnDto, Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_column_dto_1.UpdateColumnDto, Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "remove", null);
exports.ColumnsController = ColumnsController = __decorate([
    (0, common_1.Controller)('columns'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [columns_service_1.ColumnsService])
], ColumnsController);
//# sourceMappingURL=columns.controller.js.map