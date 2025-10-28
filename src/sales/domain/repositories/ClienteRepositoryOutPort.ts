import { Cliente } from "../model/Cliente";

export interface ClienteRepositoryOutPort {
    findAll(): Promise<Cliente[]>;
    findById(id: number): Promise<Cliente | null>;
    save(cliente: Cliente): Promise<void>;
    delete(id: number): Promise<boolean>;
}