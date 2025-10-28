import { Cliente } from "../../domain/model/Cliente";
import { ClienteRepositoryOutPort } from "../../domain/repositories/ClienteRepositoryOutPort";

export class ClienteUseCases{
    constructor(
        private readonly clienteRepository: ClienteRepositoryOutPort
    ){}

    async crearCliente(cliente: Cliente): Promise<void> {
        await this.clienteRepository.save(cliente);
    }

    async obtenerClientes(): Promise<Cliente[]> {
        return this.clienteRepository.findAll();
    }

    async obtenerClientePorId(id: number): Promise<Cliente | null> {
        return this.clienteRepository.findById(id);
    }

    async eliminarCliente(id: number): Promise<boolean> {
        return this.clienteRepository.delete(id);
    }
}