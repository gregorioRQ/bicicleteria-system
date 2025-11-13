"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaRequest = void 0;
class VentaRequest {
    constructor(cliente_nombre, cliente_dni, cliente_telefono, empleado_id, metodo_pago, tipo_venta, servicios_ids) {
        this.cliente_nombre = cliente_nombre;
        this.cliente_dni = cliente_dni;
        this.cliente_telefono = cliente_telefono;
        this.empleado_id = empleado_id;
        this.metodo_pago = metodo_pago;
        this.tipo_venta = tipo_venta;
        this.servicios_ids = servicios_ids;
    }
}
exports.VentaRequest = VentaRequest;
