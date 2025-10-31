"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venta = exports.Tipo = exports.MetodoPago = void 0;
var MetodoPago;
(function (MetodoPago) {
    MetodoPago["EFECTIVO"] = "EFECTIVO";
    MetodoPago["TARJETA"] = "TARJETA";
    MetodoPago["TRANSFERENCIA"] = "TRANSFERENCIA";
})(MetodoPago || (exports.MetodoPago = MetodoPago = {}));
var Tipo;
(function (Tipo) {
    Tipo["SERVICIO"] = "SERVICIO";
    Tipo["PRODUCTO"] = "PRODUCTO";
})(Tipo || (exports.Tipo = Tipo = {}));
class Venta {
    constructor(id, fecha = new Date(), total, metodo_pago, tipo_venta, empleado_id, servicio_id, cliente_nombre, cliente_telefono, cliente_dni) {
        this.id = id;
        this.fecha = fecha;
        this.total = total;
        this.metodo_pago = metodo_pago;
        this.tipo_venta = tipo_venta;
        this.empleado_id = empleado_id;
        this.servicio_id = servicio_id;
        this.cliente_nombre = cliente_nombre;
        this.cliente_telefono = cliente_telefono;
        this.cliente_dni = cliente_dni;
    }
    ;
}
exports.Venta = Venta;
