"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLVentaRepository = void 0;
const db_1 = require("../../../db");
class MySQLVentaRepository {
    update(id, venta) {
        throw new Error("Method not implemented.");
    }
    findAll() {
        throw new Error("Method not implemented.");
    }
    findById(id) {
        throw new Error("Method not implemented.");
    }
    async save(venta) {
        await db_1.pool.query("INSERT INTO ventas (fecha, total, metodo_pago, tipo_venta, empleado_id, servicio_id, cliente_nombre, cliente_telefono, cliente_dni) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);", [
            venta.fecha, venta.total, venta.metodo_pago, venta.tipo_venta, venta.empleado_id, venta.servicio_id, venta.cliente_nombre, venta.cliente_telefono, venta.cliente_dni
        ]);
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
}
exports.MySQLVentaRepository = MySQLVentaRepository;
