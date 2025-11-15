import { pool } from "../../../db";
import { Venta } from "../../domain/model/Venta";
import type { VentaRepositoryOutPort } from "../../domain/repositories/VentaRepositoryOutPort";


export class MySQLVentaRepository implements VentaRepositoryOutPort{
    update(id: number, venta: Venta): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<Venta[]> {
        const [rows]: any = await pool.query("SELECT * FROM ventas;");
        return rows.map(
            (r:any) => new Venta(r.id, r.fecha, r.total, r.metodo_pago, r.tipo_venta, r.empleado_id, r.cliente_nombre, r.cliente_telefono, r.cliente_dni, r.servicios_ids)
        );
    }
    async findById(id: number): Promise<Venta | null> {
       const [rows]: any = await pool.query("SELECT * FROM ventas WHERE id = ?;", [id]);
       if(rows.length === 0) return null;
       const r = rows[0];

        // obtener los servicio_ids relacionados desde ventas_servicios
       const [serviciosRows]: any = await pool.query(
        "SELECT servicio_id FROM ventas_servicios WHERE venta_id = ?;", [id]
       );

       /* construir la lista de servicios_ids retorna un array vacio si no hay servicios relacionados a una venta */
       const servicios_ids: number[] = Array.isArray(serviciosRows)
         ? serviciosRows.map((sr: any) => Number(sr.servicio_id))
         : [];

       // construir y devolver la venta con la lista de servicios
       const venta = new Venta(
         r.id,
         r.fecha,
         r.total,
         r.metodo_pago,
         r.tipo_venta,
         r.empleado_id,
         r.cliente_nombre,
         r.cliente_telefono,
         r.cliente_dni,
         servicios_ids
       );

       return venta;

    }

    async save(venta: Venta): Promise<Venta | null> {
        const connection = await pool.getConnection();
        try{
            await connection.beginTransaction();
            // insertar la venta
            const [result]: any = await connection.query(
            "INSERT INTO ventas (fecha, total, metodo_pago, tipo_venta, empleado_id, cliente_nombre, cliente_telefono, cliente_dni) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [
            venta.fecha, venta.total, venta.metodo_pago, venta.tipo_venta, venta.empleado_id, venta.cliente_nombre, venta.cliente_telefono, venta.cliente_dni
            ])
            const ventaId = result.insertId;
            // insertar los servicios si existen
            if(venta.servicios_ids && venta.servicios_ids.length > 0){
            const values = venta.servicios_ids.map(s => [ventaId, s])

            await connection.query(
                "INSERT INTO ventas_servicios (venta_id, servicio_id) VALUES ?",
                [values]
            );
            }
            await connection.commit();
            return await this.findById(ventaId);
        
        } catch (error) {
            await connection.rollback();
            console.error('Error al guardar venta:', error);
            return null;
        } finally{
            connection.release();
        }
    }

       
    async delete(id: number): Promise<boolean> {
       const [result]: any = await pool.query("DELETE FROM ventas WHERE id = ?;", [id]);
       return result.affectedRows > 0; 
    }

}