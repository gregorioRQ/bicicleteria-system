"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLVentaRepository = void 0;
const db_js_1 = require("../../../inventory/infrastructure/driven-adapters/db.js");
class MySQLVentaRepository {
    findAll() {
        throw new Error("Method not implemented.");
    }
    findById(id) {
        throw new Error("Method not implemented.");
    }
    async save(venta) {
        await db_js_1.pool.query("INSERT INTO ventas (fecha, total, metodo_pago, tipo, cliente_id, empleado_id, servicio_id) VALUES (?, ?, ?, ?, ?, ?, ?);", [
            venta.fecha, venta.total, venta.metodo_pago, venta.tipo, venta.cliente_id, venta.empleado_id, venta.servicio_id
        ]);
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
}
exports.MySQLVentaRepository = MySQLVentaRepository;
