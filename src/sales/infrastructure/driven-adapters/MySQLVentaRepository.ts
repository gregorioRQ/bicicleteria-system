import { pool } from "../../../db";
import { Venta } from "../../domain/model/Venta";
import type { VentaRepositoryOutPort } from "../../domain/repositories/VentaRepositoryOutPort";


export class MySQLVentaRepository implements VentaRepositoryOutPort{
    update(id: number, venta: Venta): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Venta[]> {
        throw new Error("Method not implemented.");
    }
    async findById(id: number): Promise<Venta | null> {
       const [rows]: any = await pool.query("SELECT * FROM ventas WHERE id = ?;", [id]);
       if(rows.length === 0) return null;
       const r = rows[0];
       return new Venta(r.id, r.fecha, r.total, r.metodo_pago, r.tipo_venta, r.empleado_id, r.servicio_id, r.cliente_nombre, r.cliente_telefono, r.cliente_dni);
    }
    async save(venta: Venta): Promise<Venta | null> {
       const [result]: any = await pool.query(
        "INSERT INTO ventas (fecha, total, metodo_pago, tipo_venta, empleado_id, servicio_id, cliente_nombre, cliente_telefono, cliente_dni) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);", [
            venta.fecha, venta.total, venta.metodo_pago, venta.tipo_venta, venta.empleado_id, venta.servicio_id, venta.cliente_nombre, venta.cliente_telefono, venta.cliente_dni
        ]
       )
       if(result.length === 0) return null;
       return await this.findById(result.insertId)
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}