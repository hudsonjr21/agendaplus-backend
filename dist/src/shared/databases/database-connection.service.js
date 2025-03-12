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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseConnectionService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let DataBaseConnectionService = class DataBaseConnectionService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    createTypeOrmOptions() {
        return {
            name: 'default',
            type: 'postgres',
            host: this.configService.get('TYPEORM_HOST'),
            port: Number(this.configService.get('TYPEORM_PORT')),
            username: this.configService.get('TYPEORM_USERNAME'),
            password: this.configService.get('TYPEORM_PASSWORD'),
            database: this.configService.get('TYPEORM_DATABASE'),
            entities: [this.configService.get('TYPEORM_ENTITIES')],
            migrations: [this.configService.get('TYPEORM_MIGRATIONS')],
            synchronize: this.configService.get('TYPEORM_SYNCHRONIZE'),
            maxQueryExecutionTime: 1000,
            cache: false,
        };
    }
};
exports.DataBaseConnectionService = DataBaseConnectionService;
exports.DataBaseConnectionService = DataBaseConnectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DataBaseConnectionService);
//# sourceMappingURL=database-connection.service.js.map