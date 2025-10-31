"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLItemRepository = void 0;
const Item_1 = require("../../domain/model/Item");
const db_1 = require("../../../db");
/**
 * Adaptador de Salida:
 * Esta clase implementa el puerto de salida (ItemRepository(carpeta out))
 * Puede ser reemplazada por una implementación con JPA, MongoDB, etc.
 * Implementa el puerto de salida y usa la conexión mysql2/promise.
 */
class MySQLItemRepository {
    async findAll() {
        const [rows] = await db_1.pool.query("SELECT * FROM items");
        return rows.map((r) => new Item_1.Item(r.id, r.nombre, r.marca, r.precio_compra, r.precio_venta, r.stock, r.fecha_ingreso));
    }
    async findById(id) {
        const [rows] = await db_1.pool.query("SELECT * FROM items WHERE id = ?", [id]);
        if (rows.length === 0)
            return null;
        const r = rows[0];
        return new Item_1.Item(r.id, r.nombre, r.marca, r.precio_compra, r.precio_venta, r.stock, r.fecha_ingreso);
    }
    async save(item) {
        await db_1.pool.query("INSERT INTO items (nombre, marca, precio_compra, stock, fecha_ingreso, precio_venta) VALUES (?, ?, ?, ?, ?, ?)", [item.nombre, item.marca, item.precioCompra, item.stock, item.fechaIngreso, item.precioVenta]);
    }
    async updateStock(id, newStock) {
        await db_1.pool.query("UPDATE items SET stock = ? WHERE id = ?", [newStock, id]);
    }
    async delete(id) {
        const [result] = await db_1.pool.query("DELETE FROM items WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
    async existsByName(name) {
        const [rows] = await db_1.pool.query("SELECT COUNT(*) as count FROM items WHERE nombre = ?", [name]);
        return rows[0].count > 0;
    }
    async findByName(name) {
        const [rows] = await db_1.pool.query("SELECT * FROM items WHERE nombre = ? LIMIT 1", [name]);
        if (!rows || rows.length === 0)
            return null;
        const r = rows[0];
        return new Item_1.Item(r.id, r.nombre, r.marca, r.precio_compra, r.precio_venta, r.stock, r.fecha_ingreso);
    }
    async findByMarca(marca) {
        // Perform a case-insensitive match on marca
        const [rows] = await db_1.pool.query("SELECT * FROM items WHERE LOWER(marca) = LOWER(?)", [marca]);
        return rows.map((r) => new Item_1.Item(r.id, r.nombre, r.marca, r.precio_compra, r.precio_venta, r.stock, r.fecha_ingreso));
    }
}
exports.MySQLItemRepository = MySQLItemRepository;
