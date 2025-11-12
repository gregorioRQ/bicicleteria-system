import type { IItemRepositoryPort } from "../../domain/repositories/ItemRepositoryOutPort";
import { Item } from "../../domain/model/Item";
import { pool } from "../../../db"; 


export class MySQLItemRepository implements IItemRepositoryPort {

  async updateStockBatch(items: Array<{ item_id: number; descontar: number; }>): Promise<Item[]> {
    const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Actualizar cada item (pero dentro de una transacción)
    for (const item of items) {
      await connection.query(
        "UPDATE items SET stock = stock - ? WHERE id = ?",
        [item.descontar, item.item_id]
      );
    }
    
    // Obtener todos los items actualizados en una sola query
    const ids = items.map(item => item.item_id);
    const [rows]: any = await connection.query(
      `SELECT * FROM items WHERE id IN (?)`,
      [ids]
    );
    
    await connection.commit();
    return rows.map(
      (r: any) => new Item(r.id, r.nombre,r.marca ,r.precio_compra,r.precio_venta, r.stock, r.fecha_ingreso)
    );
    
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
  }


  async findAll(): Promise<Item[]> {
    const [rows]: any = await pool.query("SELECT * FROM items");
    return rows.map(
      (r: any) => new Item(r.id, r.nombre,r.marca ,r.precio_compra,r.precio_venta, r.stock, r.fecha_ingreso)
    );
  }

  async findById(id: number): Promise<Item | null> {
    const [rows]: any = await pool.query("SELECT * FROM items WHERE id = ?", [id]);
    if (rows.length === 0) return null;
    const r = rows[0];
    return new Item(r.id, r.nombre,r.marca ,r.precio_compra,r.precio_venta, r.stock, r.fecha_ingreso);
  }

  async save(item: Item): Promise<void> {
    await pool.query(
      "INSERT INTO items (nombre, marca, precio_compra, stock, fecha_ingreso, precio_venta) VALUES (?, ?, ?, ?, ?, ?)",
      [item.nombre, item.marca, item.precioCompra, item.stock,item.fechaIngreso, item.precioVenta]
    );
  }

  async updateStock(id: number, newStock: number): Promise<boolean> {
    const [rows]: any = await pool.query("UPDATE items SET stock = ? WHERE id = ?", [newStock, id]);
    return rows.affectedRows > 0;
  }

  async decrementarStock(id: number, cantidad: number): Promise<boolean> {
    const [rows]: any = await pool.query("UPDATE items SET stock = stock - ? WHERE id = ?", [cantidad, id]);
    return rows.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result]: any = await pool.query("DELETE FROM items WHERE id = ?", [id]);
  return result.affectedRows > 0;
  }

  async existsByName(name: string): Promise<boolean> {
    const [rows]: any = await pool.query("SELECT COUNT(*) as count FROM items WHERE nombre = ?", [name]);
    return rows[0].count > 0;
  }

  async findByName(name: string): Promise<Item | null> {
    const [rows]: any = await pool.query("SELECT * FROM items WHERE nombre = ? LIMIT 1", [name]);
    if (!rows || rows.length === 0) return null;
    const r = rows[0];
    return new Item(r.id, r.nombre,r.marca ,r.precio_compra,r.precio_venta, r.stock, r.fecha_ingreso);
  }

  async findByMarca(marca: string): Promise<Item[]> {
    
    const [rows]: any = await pool.query(
      "SELECT * FROM items WHERE LOWER(marca) = LOWER(?)",
      [marca]
    );
    return rows.map(
      (r: any) => new Item(r.id, r.nombre,r.marca ,r.precio_compra,r.precio_venta, r.stock, r.fecha_ingreso)
    );
  }
}

