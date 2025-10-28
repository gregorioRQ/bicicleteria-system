import { pool } from "../../../db";
import { Cliente } from "../../domain/model/Cliente";
import { ClienteRepositoryOutPort } from "../../domain/repositories/ClienteRepositoryOutPort";

export class MySQLClienteRepository implements ClienteRepositoryOutPort {
    findAll(): Promise<Cliente[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Cliente | null> {
        throw new Error("Method not implemented.");
    }
    async save(cliente: Cliente): Promise<void> {
        await pool.query(
            "INSERT INTO clientes (nombre, dni, telefono) VALUES (?, ?, ?);", [
                cliente.nombre, cliente.dni, cliente.telefono
            ]
        )
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    // Implementación del repositorio utilizando MySQL
}