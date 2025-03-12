import { Repository } from 'typeorm';
import { Cliente } from '../../../infra/database/entities/cliente.entity';
export declare class ClienteService {
    private clienteRepository;
    constructor(clienteRepository: Repository<Cliente>);
    findAll(): Promise<Cliente[]>;
    findOne(id: number): Promise<Cliente>;
    create(cliente: Cliente): Promise<Cliente>;
    update(id: number, cliente: Cliente): Promise<Cliente>;
    remove(id: number): Promise<void>;
}
