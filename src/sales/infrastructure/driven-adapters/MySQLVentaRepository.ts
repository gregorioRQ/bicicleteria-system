import { pool } from "../../../db";
import type { Venta } from "../../domain/model/Venta";
import type { VentaRepositoryOutPort } from "../../domain/repositories/VentaRepositoryOutPort";


export class MySQLVentaRepository implements VentaRepositoryOutPort{
    findAll(): Promise<Venta[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Venta | null> {
        throw new Error("Method not implemented.");
    }
    async save(venta: Venta): Promise<void> {
       await pool.query(
        "INSERT INTO ventas (fecha, total, metodo_pago, tipo, cliente_id, empleado_id, servicio_id) VALUES (?, ?, ?, ?, ?, ?, ?);", [
            venta.fecha, venta.total, venta.metodo_pago, venta.tipo, venta.cliente_id, venta.empleado_id, venta.servicio_id
        ]
       )
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}