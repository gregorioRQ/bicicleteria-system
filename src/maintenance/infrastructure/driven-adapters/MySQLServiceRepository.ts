import { pool } from "../../../db";
import formatearFecha from "../../../shared/fechaFormatter";
import { Service } from "../../domain/model/Service";
import type { ServiceRepositoryOutPort } from "../../domain/repositories/ServiceRepositoryOutPort";
import { format } from 'date-fns';


export class MySQLServiceRepository implements ServiceRepositoryOutPort{
    async update(s: Service): Promise<Service | null> {
        const idS = s.id;
    const itemsEmpleadosJson = JSON.stringify(s.items_empleados);
    const [rows]: any = await pool.query(
        "UPDATE servicios SET tipo_servicio = ?, descripcion = ?, num_bicicleta = ?, precio_base = ?, precio_total = ?, costo_piezas = ?, fecha_ingreso = ?, estado = ?, empleado_id = ?, fecha_entrega = ?, items_empleados = ? WHERE id = ?",
        [
            s.tipo_servicio, 
            s.descripcion, 
            s.num_bicicleta, 
            s.precio_base, 
            s.precio_total, 
            s.costo_piezas, 
            formatearFecha(s.fecha_ingreso), 
            s.estado, 
            s.empleado_id, 
            formatearFecha(s.fecha_entrega),
            itemsEmpleadosJson, 
            idS  
        ]
    );
    if(rows.affectedRows === 0) return null;
        return await this.findById(s.id!);
    }
    
    async findAll(): Promise<Service[]> {
        const [rows]: any = await pool.query(
            "SELECT * FROM servicios;");
        return rows.map(
            (r:any)=> new Service(r.id, r.tipo_servicio, r.descripcion, r.num_bicicleta,  r.precio_base, r.precio_total, r.costo_piezas, r.fecha_ingreso, r.estado, r.empleado_id, r.fecha_entrega, r.items_empleados)
        );
    }

    async findById(id: number): Promise<Service | null> {
        const [rows]: any = await pool.query("SELECT * FROM servicios WHERE id = ?;",[id]);

        if(rows.length === 0) return null;
        const r = rows[0];
        return new Service(r.id, r.tipo_servicio, r.descripcion, r.num_bicicleta,  r.precio_base, r.precio_total, r.costo_piezas, r.fecha_ingreso, r.estado, r.empleado_id, r.fecha_entrega, r.items_empleados);
    }

    async save(s: Service): Promise<Service | null> {

        const json = JSON.stringify(s.items_empleados)
       const [result]: any = await pool.query(
        "INSERT INTO servicios (tipo_servicio, descripcion, num_bicicleta, precio_base, precio_total, costo_piezas, fecha_ingreso, estado, empleado_id, fecha_entrega, items_empleados) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [s.tipo_servicio, s.descripcion ?? "no description", s.num_bicicleta, s.precio_base, s.precio_total, s.costo_piezas, formatearFecha(s.fecha_ingreso) , s.estado, s.empleado_id,formatearFecha(s.fecha_entrega) , json]
        ) 
        if(result.length === 0) return null;
        return await this.findById(result.insertId);
    
    }

    async delete(id: number): Promise<boolean> {
        const [result]: any = await pool.query("DELETE FROM ventas WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }

    async updateEstado(id: number, estado: string): Promise<boolean> {
        const [result]: any = await pool.query("UPDATE servicios SET estado = ? WHERE id = ?", [estado, id]);
        return result.affectedRows > 0;
    }

    async updateFechaEntrega(id: number, fechaEntrega: Date): Promise<void> {
        await pool.query("UPDATE servicios SET fecha_entrega = ? WHERE id = ?", [fechaEntrega, id]);
    }

}