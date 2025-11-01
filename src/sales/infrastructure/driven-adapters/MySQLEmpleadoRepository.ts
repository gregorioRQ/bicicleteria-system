import { pool } from "../../../db";
import { Empleado } from "../../domain/model/Empleado";
import { EmpleadoRepositoryOutPort } from "../../domain/repositories/EmpleadoRepositoryOutPort";

export class MySQLEmpleadoRepository implements EmpleadoRepositoryOutPort {
    async findByDni(dni: string): Promise<Empleado | null> {
        const [rows]: any = await pool.query("SELECT * FROM empleados WHERE dni = ? LIMIT 1", [dni]);
        if (!rows || rows.length === 0) return null;
        const r = rows[0];
        return new Empleado(r.id, r.nombre, r.dni, r.rol, r.telefono);
    }
    async findAll(): Promise<Empleado[]> {
        const [rows]: any = await pool.query("SELECT * FROM empleados");
        return rows.map((r: any) => new Empleado(r.id, r.nombre, r.dni, r.rol, r.telefono));
    }
    async findById(id: number): Promise<Empleado | null> {
        const [rows]: any = await pool.query("SELECT * FROM empleados WHERE id = ? LIMIT 1", [id]);
        if (!rows || rows.length === 0) return null;
        const r = rows[0];
        return new Empleado(r.id, r.nombre, r.dni, r.rol, r.telefono);
    }
    async save(empleado: Empleado): Promise<void> {
        await pool.query(
            "INSERT INTO empleados (nombre, dni, telefono, rol) VALUES (?, ?, ?, ?);", [
                empleado.nombre, empleado.dni, empleado.telefono, empleado.rol
            ]
        )
    }
    async delete(id: number): Promise<boolean> {
        const [result]: any = await pool.query("DELETE FROM empleados WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
    
}