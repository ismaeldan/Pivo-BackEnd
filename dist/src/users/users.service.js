"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const db_module_1 = require("../db/db.module");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    db;
    constructor(db) {
        this.db = db;
    }
    async create(createUserDto) {
        const [existingUser] = await this.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.email, createUserDto.email));
        if (existingUser) {
            throw new common_1.ConflictException('Um usuário com este e-mail já existe.');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
        const [newUser] = await this.db
            .insert(schema_1.users)
            .values({
            name: createUserDto.name,
            email: createUserDto.email,
            password: hashedPassword,
        })
            .returning({
            id: schema_1.users.id,
            name: schema_1.users.name,
            email: schema_1.users.email,
            avatarUrl: schema_1.users.avatarUrl,
            createdAt: schema_1.users.createdAt,
        });
        return newUser;
    }
    async findAll() {
        return this.db.query.users.findMany({
            columns: {
                password: false,
            },
        });
    }
    async findOne(id) {
        const [user] = await this.db.query.users.findMany({
            where: (0, drizzle_orm_1.eq)(schema_1.users.id, id),
            columns: {
                password: false,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado.`);
        }
        return user;
    }
    async findOneByEmail(email) {
        const [user] = await this.db.query.users.findMany({
            where: (0, drizzle_orm_1.eq)(schema_1.users.email, email),
        });
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(db_module_1.DB)),
    __metadata("design:paramtypes", [Object])
], UsersService);
//# sourceMappingURL=users.service.js.map