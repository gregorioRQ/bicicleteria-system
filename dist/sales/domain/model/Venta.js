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
    constructor(fecha, total, metodo_pago, tipo, cliente_id, empleado_id, servicio_id) {
        this.fecha = fecha;
        this.total = total;
        this.metodo_pago = metodo_pago;
        this.tipo = tipo;
        this.cliente_id = cliente_id;
        this.empleado_id = empleado_id;
        this.servicio_id = servicio_id;
    }
    ;
}
exports.Venta = Venta;
