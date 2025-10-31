"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLEmpleadoRepository = void 0;
const db_1 = require("../../../db");
class MySQLEmpleadoRepository {
    findByDni(dni) {
        throw new Error("Method not implemented.");
    }
    findAll() {
        throw new Error("Method not implemented.");
    }
    findById(id) {
        throw new Error("Method not implemented.");
    }
    async save(empleado) {
        await db_1.pool.query("INSERT INTO empleados (nombre, dni, telefono, rol) VALUES (?, ?, ?, ?);", [
            empleado.nombre, empleado.dni, empleado.telefono, empleado.rol
        ]);
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
}
exports.MySQLEmpleadoRepository = MySQLEmpleadoRepository;
