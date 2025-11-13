"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaResponse = void 0;
class VentaResponse {
    constructor(id, total, metodo_pago, tipo_venta, cliente_nombre, cliente_dni, servicios) {
        this.id = id;
        this.total = total;
        this.metodo_pago = metodo_pago;
        this.tipo_venta = tipo_venta;
        this.cliente_nombre = cliente_nombre;
        this.cliente_dni = cliente_dni;
        this.servicios = servicios;
    }
    ;
}
exports.VentaResponse = VentaResponse;
