import type { IItemRepositoryPort } from "../../domain/repositories/ItemRepositoryOutPort.js";
import { Item } from "../../domain/model/Item.js";
import { pool } from "./db.js"; 

/**
 * Adaptador de Salida: 
 * Esta clase implementa el puerto de salida (ItemRepository(carpeta out))
 * Puede ser reemplazada por una implementación con JPA, MongoDB, etc.
 * Implementa el puerto de salida y usa la conexión mysql2/promise.
 */

export class MySQLItemRepository implements IItemRepositoryPort {
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

  async updateStock(id: number, newStock: number): Promise<void> {
    await pool.query("UPDATE items SET stock = ? WHERE id = ?", [newStock, id]);
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
    // Perform a case-insensitive match on marca
    const [rows]: any = await pool.query(
      "SELECT * FROM items WHERE LOWER(marca) = LOWER(?)",
      [marca]
    );
    return rows.map(
      (r: any) => new Item(r.id, r.nombre,r.marca ,r.precio_compra,r.precio_venta, r.stock, r.fecha_ingreso)
    );
  }
}

