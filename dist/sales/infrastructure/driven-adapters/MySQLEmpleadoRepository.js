"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLEmpleadoRepository = void 0;
const db_1 = require("../../../db");
const Empleado_1 = require("../../domain/model/Empleado");
class MySQLEmpleadoRepository {
    async findByDni(dni) {
        const [rows] = await db_1.pool.query("SELECT * FROM empleados WHERE dni = ? LIMIT 1", [dni]);
        if (!rows || rows.length === 0)
            return null;
        const r = rows[0];
        return new Empleado_1.Empleado(r.id, r.nombre, r.dni, r.rol, r.telefono);
    }
    async findAll() {
        const [rows] = await db_1.pool.query("SELECT * FROM empleados");
        return rows.map((r) => new Empleado_1.Empleado(r.id, r.nombre, r.dni, r.rol, r.telefono));
    }
    async findById(id) {
        const [rows] = await db_1.pool.query("SELECT * FROM empleados WHERE id = ? LIMIT 1", [id]);
        if (!rows || rows.length === 0)
            return null;
        const r = rows[0];
        return new Empleado_1.Empleado(r.id, r.nombre, r.dni, r.rol, r.telefono);
    }
    async save(empleado) {
        await db_1.pool.query("INSERT INTO empleados (nombre, dni, telefono, rol) VALUES (?, ?, ?, ?);", [
            empleado.nombre, empleado.dni, empleado.telefono, empleado.rol
        ]);
    }
    async delete(id) {
        const [result] = await db_1.pool.query("DELETE FROM empleados WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}
exports.MySQLEmpleadoRepository = MySQLEmpleadoRepository;
