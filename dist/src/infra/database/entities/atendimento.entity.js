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
exports.Atendimento = void 0;
const typeorm_1 = require("typeorm");
const cliente_entity_1 = require("./cliente.entity");
const funcionario_entity_1 = require("./funcionario.entity");
const servico_entity_1 = require("./servico.entity");
let Atendimento = class Atendimento {
    id;
    cliente;
    funcionario;
    servico;
    data;
    horario;
    foto;
};
exports.Atendimento = Atendimento;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Atendimento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => cliente_entity_1.Cliente),
    (0, typeorm_1.JoinColumn)({ name: 'clienteId' }),
    __metadata("design:type", cliente_entity_1.Cliente)
], Atendimento.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => funcionario_entity_1.Funcionario),
    (0, typeorm_1.JoinColumn)({ name: 'funcionarioId' }),
    __metadata("design:type", funcionario_entity_1.Funcionario)
], Atendimento.prototype, "funcionario", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => servico_entity_1.Servico),
    (0, typeorm_1.JoinColumn)({ name: 'servicoId' }),
    __metadata("design:type", servico_entity_1.Servico)
], Atendimento.prototype, "servico", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Atendimento.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Atendimento.prototype, "horario", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Atendimento.prototype, "foto", void 0);
exports.Atendimento = Atendimento = __decorate([
    (0, typeorm_1.Entity)()
], Atendimento);
//# sourceMappingURL=atendimento.entity.js.map