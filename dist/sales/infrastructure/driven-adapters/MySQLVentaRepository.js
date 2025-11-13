"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLVentaRepository = void 0;
const db_1 = require("../../../db");
const Venta_1 = require("../../domain/model/Venta");
class MySQLVentaRepository {
    update(id, venta) {
        throw new Error("Method not implemented.");
    }
    findAll() {
        throw new Error("Method not implemented.");
    }
    async findById(id) {
        const [rows] = await db_1.pool.query("SELECT * FROM ventas WHERE id = ?;", [id]);
        if (rows.length === 0)
            return null;
        const r = rows[0];
        return new Venta_1.Venta(r.id, r.fecha, r.total, r.metodo_pago, r.tipo_venta, r.empleado_id, r.cliente_nombre, r.cliente_telefono, r.cliente_dni, r.servicios_ids);
    }
    async save(venta) {
        const connection = await db_1.pool.getConnection();
        try {
            await connection.beginTransaction();
            // insertar la venta
            const [result] = await connection.query("INSERT INTO ventas (fecha, total, metodo_pago, tipo_venta, empleado_id, cliente_nombre, cliente_telefono, cliente_dni) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [
                venta.fecha, venta.total, venta.metodo_pago, venta.tipo_venta, venta.empleado_id, venta.cliente_nombre, venta.cliente_telefono, venta.cliente_dni
            ]);
            const ventaId = result.insertId;
            // insertar los servicios si existen
            if (venta.servicios_ids && venta.servicios_ids.length > 0) {
                const values = venta.servicios_ids.map(s => [ventaId, s]);
                await connection.query("INSERT INTO ventas_servicios (venta_id, servicio_id) VALUES ?", [values]);
            }
            await connection.commit();
            return await this.findById(ventaId);
        }
        catch (error) {
            await connection.rollback();
            console.error('Error al guardar venta:', error);
            return null;
        }
        finally {
            connection.release();
        }
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
}
exports.MySQLVentaRepository = MySQLVentaRepository;
