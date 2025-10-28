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
    aumentarStock(cantidad) {
        if (cantidad <= 0)
            throw new Error("La cantidad debe ser mayor a cero");
        this.stock += cantidad;
    }
    reducirStock(cantidad) {
        if (cantidad <= 0)
            throw new Error("La cantidad debe ser mayor a cero");
        if (cantidad > this.stock)
            throw new Error("Stock insuficiente");
        this.stock -= cantidad;
    }
}
exports.Item = Item;
