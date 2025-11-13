"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLServiceRepository = void 0;
const db_1 = require("../../../db");
const fechaFormatter_1 = __importDefault(require("../../../shared/fechaFormatter"));
const Service_1 = require("../../domain/model/Service");
class MySQLServiceRepository {
    async update(s) {
        const idS = s.id;
        const itemsEmpleadosJson = JSON.stringify(s.items_empleados);
        const [rows] = await db_1.pool.query("UPDATE servicios SET tipo_servicio = ?, descripcion = ?, num_bicicleta = ?, precio_base = ?, precio_total = ?, costo_piezas = ?, fecha_ingreso = ?, estado = ?, empleado_id = ?, fecha_entrega = ?, items_empleados = ? WHERE id = ?", [
            s.tipo_servicio,
            s.descripcion,
            s.num_bicicleta,
            s.precio_base,
            s.precio_total,
            s.costo_piezas,
            (0, fechaFormatter_1.default)(s.fecha_ingreso),
            s.estado,
            s.empleado_id,
            (0, fechaFormatter_1.default)(s.fecha_entrega),
            itemsEmpleadosJson,
            idS
        ]);
        if (rows.affectedRows === 0)
            return null;
        return await this.findById(s.id);
    }
    async findAll() {
        const [rows] = await db_1.pool.query("SELECT * FROM servicios;");
        return rows.map((r) => new Service_1.Service(r.id, r.tipo_servicio, r.descripcion, r.num_bicicleta, r.precio_base, r.precio_total, r.costo_piezas, r.fecha_ingreso, r.estado, r.empleado_id, r.fecha_entrega, r.items_empleados));
    }
    async findById(id) {
        const [rows] = await db_1.pool.query("SELECT * FROM servicios WHERE id = ?;", [id]);
        if (rows.length === 0)
            return null;
        const r = rows[0];
        return new Service_1.Service(r.id, r.tipo_servicio, r.descripcion, r.num_bicicleta, r.precio_base, r.precio_total, r.costo_piezas, r.fecha_ingreso, r.estado, r.empleado_id, r.fecha_entrega, r.items_empleados);
    }
    async save(s) {
        const json = JSON.stringify(s.items_empleados);
        const [result] = await db_1.pool.query("INSERT INTO servicios (tipo_servicio, descripcion, num_bicicleta, precio_base, precio_total, costo_piezas, fecha_ingreso, estado, empleado_id, fecha_entrega, items_empleados) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [s.tipo_servicio, s.descripcion ?? "no description", s.num_bicicleta, s.precio_base, s.precio_total, s.costo_piezas, (0, fechaFormatter_1.default)(s.fecha_ingreso), s.estado, s.empleado_id, (0, fechaFormatter_1.default)(s.fecha_entrega), json]);
        if (result.length === 0)
            return null;
        return await this.findById(result.insertId);
    }
    async delete(id) {
        const [result] = await db_1.pool.query("DELETE FROM servicios WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
    async updateEstado(id, estado) {
        const [result] = await db_1.pool.query("UPDATE servicios SET estado = ? WHERE id = ?", [estado, id]);
        return result.affectedRows > 0;
    }
    async updateFechaEntrega(id, fechaEntrega) {
        await db_1.pool.query("UPDATE servicios SET fecha_entrega = ? WHERE id = ?", [fechaEntrega, id]);
    }
}
exports.MySQLServiceRepository = MySQLServiceRepository;
