import { ClienteService } from '../../../domain/usecases/cliente/cliente.service';
import { Cliente } from '../../database/entities/cliente.entity';
export declare class ClienteController {
    private readonly clienteService;
    constructor(clienteService: ClienteService);
    findAll(): Promise<Cliente[]>;
    findOne(id: number): Promise<Cliente>;
    create(cliente: Cliente): Promise<Cliente>;
    update(id: number, cliente: Cliente): Promise<Cliente>;
    remove(id: number): Promise<void>;
}
