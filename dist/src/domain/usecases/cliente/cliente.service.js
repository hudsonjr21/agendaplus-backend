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
exports.ClienteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const cliente_entity_1 = require("../../../infra/database/entities/cliente.entity");
let ClienteService = class ClienteService {
    clienteRepository;
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    findAll() {
        return this.clienteRepository.find();
    }
    async findOne(id) {
        const cliente = await this.clienteRepository.findOne({ where: { id } });
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente com ID ${id} não encontrado`);
        }
        return cliente;
    }
    create(cliente) {
        return this.clienteRepository.save(cliente);
    }
    async update(id, cliente) {
        await this.clienteRepository.update(id, cliente);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.clienteRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Cliente com ID ${id} não encontrado`);
        }
    }
};
exports.ClienteService = ClienteService;
exports.ClienteService = ClienteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(cliente_entity_1.Cliente)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ClienteService);
//# sourceMappingURL=cliente.service.js.map