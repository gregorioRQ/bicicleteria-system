import { pool } from "../../../db";
import type { Venta } from "../../domain/model/Venta";
import type { VentaRepositoryOutPort } from "../../domain/repositories/VentaRepositoryOutPort";


export class MySQLVentaRepository implements VentaRepositoryOutPort{
    update(id: number, venta: Venta): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Venta[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Venta | null> {
        throw new Error("Method not implemented.");
    }
    async save(venta: Venta): Promise<void> {
       await pool.query(
        "INSERT INTO ventas (fecha, total, metodo_pago, tipo_venta, empleado_id, servicio_id, cliente_nombre, cliente_telefono, cliente_dni) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);", [
            venta.fecha, venta.total, venta.metodo_pago, venta.tipo_venta, venta.empleado_id, venta.servicio_id, venta.cliente_nombre, venta.cliente_telefono, venta.cliente_dni
        ]
       )
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}