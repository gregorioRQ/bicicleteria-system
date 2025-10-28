"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLServiceRepository = void 0;
const db_js_1 = require("../../../inventory/infrastructure/driven-adapters/db.js");
const Service_js_1 = require("../../domain/model/Service.js");
class MySQLServiceRepository {
    async update(id, s) {
        await db_js_1.pool.query("UPDATE servicios SET tipo_servicio = ?, descripcion = ?, num_cliente = ?, num_bicicleta = ?, precio_base = ?, precio_total = ?, costo_piezas = ?, fecha_ingreso = ?, estado = ?, mecanico_id = ?, fecha_entrega = ? WHERE id = ?", [s.tipo_servicio, s.descripcion, s.num_cliente, s.num_bicicleta, s.precio_base, s.precio_total, s.costo_piezas, s.fecha_ingreso, s.estado, s.mecanico_id, id]);
    }
    async findAll() {
        const [rows] = await db_js_1.pool.query("SELECT * FROM servicios;");
        return rows.map((r) => new Service_js_1.Service(r.id, r.tipo_servicio, r.descripcion, r.num_cliente, r.num_bicicleta, r.precio_base, r.precio_total, r.costo_piezas, r.fecha_ingreso, r.estado, r.mecanico_id, r.fecha_entrega));
    }
    async findById(id) {
        const [rows] = await db_js_1.pool.query("SELECT * FROM servicios WHERE id = ?;", [id]);
        if (rows.length === 0)
            return null;
        const r = rows[0];
        return new Service_js_1.Service(r.id, r.tipo_servicio, r.descripcion, r.num_cliente, r.num_bicicleta, r.precio_base, r.precio_total, r.costo_piezas, r.fecha_ingreso, r.estado, r.mecanico_id, r.fecha_entrega);
    }
    async save(s) {
        await db_js_1.pool.query("INSERT INTO servicios (tipo_servicio, descripcion, num_cliente, num_bicicleta, precio_base, precio_total, costo_piezas, fecha_ingreso, estado, mecanico_id, fecha_entrega) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [s.tipo_servicio, s.descripcion, s.num_cliente, s.num_bicicleta, s.precio_base, s.precio_total, s.costo_piezas, s.fecha_ingreso, s.estado, s.mecanico_id, s.fecha_entrega]);
    }
    async delete(id) {
        const [result] = await db_js_1.pool.query("DELETE FROM ventas WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
    async updateEstado(id, estado) {
        await db_js_1.pool.query("UPDATE servicios SET estado = ? WHERE id = ?", [estado, id]);
    }
    async updateFechaEntrega(id, fechaEntrega) {
        await db_js_1.pool.query("UPDATE servicios SET fecha_entrega = ? WHERE id = ?", [fechaEntrega, id]);
    }
}
exports.MySQLServiceRepository = MySQLServiceRepository;
