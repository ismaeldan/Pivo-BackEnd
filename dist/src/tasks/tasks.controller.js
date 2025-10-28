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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const class_validator_1 = require("class-validator");
const schema_1 = require("../db/schema");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
class FindAllTasksDto {
    status;
}
__decorate([
    (0, class_validator_1.IsEnum)(schema_1.TaskStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindAllTasksDto.prototype, "status", void 0);
let TasksController = class TasksController {
    tasksService;
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    create(createTaskDto, req) {
        const userId = req.user.userId;
        const taskDataComAutor = {
            ...createTaskDto,
            authorId: userId,
        };
        return this.tasksService.create(taskDataComAutor);
    }
    findAll(queryParams, req) {
        const userId = req.user.userId;
        return this.tasksService.findAll(userId, queryParams.status);
    }
    async searchTasks(searchQuery, req) {
        if (!searchQuery) {
            return [];
        }
        const userId = req.user.userId;
        const results = await this.tasksService.search(searchQuery, userId);
        return results;
    }
    findOne(id, req) {
        const userId = req.user.userId;
        return this.tasksService.findOne(id, userId);
    }
    update(id, updateTaskDto, req) {
        const userId = req.user.userId;
        return this.tasksService.update(id, updateTaskDto, userId);
    }
    remove(id, req) {
        const userId = req.user.userId;
        return this.tasksService.remove(id, userId);
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FindAllTasksDto, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "searchTasks", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_dto_1.UpdateTaskDto, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], TasksController.prototype, "remove", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('tasks'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map