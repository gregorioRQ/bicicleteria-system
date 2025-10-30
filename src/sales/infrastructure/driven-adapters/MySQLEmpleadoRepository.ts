import { pool } from "../../../db";
import { Empleado } from "../../domain/model/Empleado";
import { EmpleadoRepositoryOutPort } from "../../domain/repositories/EmpleadoRepositoryOutPort";

export class MySQLEmpleadoRepository implements EmpleadoRepositoryOutPort {
    findByDni(dni: string): Promise<Empleado | null> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Empleado[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Empleado | null> {
        throw new Error("Method not implemented.");
    }
    async save(empleado: Empleado): Promise<void> {
        await pool.query(
            "INSERT INTO empleados (nombre, dni, telefono, rol) VALUES (?, ?, ?, ?);", [
                empleado.nombre, empleado.dni, empleado.telefono, empleado.rol
            ]
        )
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    // Implementación del repositorio utilizando MySQL
}