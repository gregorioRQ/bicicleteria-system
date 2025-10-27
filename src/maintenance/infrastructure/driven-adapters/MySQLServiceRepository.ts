import { pool } from "../../../inventory/infrastructure/driven-adapters/db.js";
import type { Service } from "../../domain/model/Service.js";
import type { ServiceRepositoryOutPort } from "../../domain/repositories/ServiceRepositoryOutPort.js";


export class MySQLServiceRepository implements ServiceRepositoryOutPort{
    async update(id: number, s: Service): Promise<void> {
        await pool.query(
            "UPDATE servicios SET tipo_servicio = ?, descripcion = ?, num_cliente = ?, num_bicicleta = ?, precio_base = ?, precio_total = ?, costo_piezas = ?, fecha_ingreso = ?, estado = ?, mecanico_id = ?, fecha_entrega = ? WHERE id = ?",
            [s.tipo_servicio, s.descripcion, s.num_cliente, s.num_bicicleta, s.precio_base, s.precio_total, s.costo_piezas, s.fecha_ingreso, s.estado, s.mecanico_id, id]
        );
    }
    findAll(): Promise<Service[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Service | null> {
        throw new Error("Method not implemented.");
    }
    async save(s: Service): Promise<void> {
       await pool.query(
        "INSERT INTO servicios (tipo_servicio, descripcion, num_cliente, num_bicicleta, precio_base, precio_total, costo_piezas, fecha_ingreso, estado, mecanico_id, fecha_entrega) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [s.tipo_servicio, s.descripcion, s.num_cliente, s.num_bicicleta, s.precio_base, s.precio_total, s.costo_piezas, s.fecha_ingreso, s.estado, s.mecanico_id, s.fecha_entrega]
        )

    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async updateEstado(id: number, estado: string): Promise<void> {
        await pool.query("UPDATE servicios SET estado = ? WHERE id = ?", [estado, id]);
    }

    async updateFechaEntrega(id: number, fechaEntrega: Date): Promise<void> {
        await pool.query("UPDATE servicios SET fecha_entrega = ? WHERE id = ?", [fechaEntrega, id]);
    }

}