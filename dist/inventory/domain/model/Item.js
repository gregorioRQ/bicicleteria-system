"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(id, nombre, marca, precioCompra, precioVenta, stock, fechaIngreso = new Date()) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.stock = stock;
        this.fechaIngreso = fechaIngreso;
    }
}
exports.Item = Item;
