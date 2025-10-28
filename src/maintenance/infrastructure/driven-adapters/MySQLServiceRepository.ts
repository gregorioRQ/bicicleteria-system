import { pool } from "../../../db";
import { Service } from "../../domain/model/Service";
import type { ServiceRepositoryOutPort } from "../../domain/repositories/ServiceRepositoryOutPort";


export class MySQLServiceRepository implements ServiceRepositoryOutPort{
    async update(id: number, s: Service): Promise<void> {
        await pool.query(
            "UPDATE servicios SET tipo_servicio = ?, descripcion = ?, num_cliente = ?, num_bicicleta = ?, precio_base = ?, precio_total = ?, costo_piezas = ?, fecha_ingreso = ?, estado = ?, mecanico_id = ?, fecha_entrega = ? WHERE id = ?",
            [s.tipo_servicio, s.descripcion, s.num_cliente, s.num_bicicleta, s.precio_base, s.precio_total, s.costo_piezas, s.fecha_ingreso, s.estado, s.mecanico_id, id]
        );
    }
    
    async findAll(): Promise<Service[]> {
        const [rows]: any = await pool.query(
            "SELECT * FROM servicios;");
        return rows.map(
            (r:any)=> new Service(r.id, r.tipo_servicio, r.descripcion, r.num_cliente, r.num_bicicleta,  r.precio_base, r.precio_total, r.costo_piezas, r.fecha_ingreso, r.estado, r.mecanico_id, r.fecha_entrega)
        );
    }

    async findById(id: number): Promise<Service | null> {
        const [rows]: any = await pool.query("SELECT * FROM servicios WHERE id = ?;",[id]);

        if(rows.length === 0) return null;
        const r = rows[0];
        return new Service(r.id, r.tipo_servicio, r.descripcion, r.num_cliente, r.num_bicicleta,  r.precio_base, r.precio_total, r.costo_piezas, r.fecha_ingreso, r.estado, r.mecanico_id, r.fecha_entrega);
    }

    async save(s: Service): Promise<void> {
       await pool.query(
        "INSERT INTO servicios (tipo_servicio, descripcion, num_cliente, num_bicicleta, precio_base, precio_total, costo_piezas, fecha_ingreso, estado, mecanico_id, fecha_entrega) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [s.tipo_servicio, s.descripcion, s.num_cliente, s.num_bicicleta, s.precio_base, s.precio_total, s.costo_piezas, s.fecha_ingreso, s.estado, s.mecanico_id, s.fecha_entrega]
        )

    }

    async delete(id: number): Promise<boolean> {
        const [result]: any = await pool.query("DELETE FROM ventas WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }

    async updateEstado(id: number, estado: string): Promise<void> {
        await pool.query("UPDATE servicios SET estado = ? WHERE id = ?", [estado, id]);
    }

    async updateFechaEntrega(id: number, fechaEntrega: Date): Promise<void> {
        await pool.query("UPDATE servicios SET fecha_entrega = ? WHERE id = ?", [fechaEntrega, id]);
    }

}