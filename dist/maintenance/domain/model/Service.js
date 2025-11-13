"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.Estado = exports.TipoServicio = void 0;
var TipoServicio;
(function (TipoServicio) {
    TipoServicio["REPARACION"] = "REPARACION";
    TipoServicio["CHEQUEO"] = "CHEQUEO";
})(TipoServicio || (exports.TipoServicio = TipoServicio = {}));
var Estado;
(function (Estado) {
    Estado["PENDIENTE"] = "PENDIENTE";
    Estado["EN_PROCESO"] = "EN_PROCESO";
    Estado["FINALIZADO"] = "FINALIZADO";
    Estado["ENTREGADO"] = "ENTREGADO";
})(Estado || (exports.Estado = Estado = {}));
class Service {
    constructor(id, tipo_servicio, descripcion, num_bicicleta, precio_base, precio_total, costo_piezas, fecha_ingreso = new Date(), estado, empleado_id, fecha_entrega, items_empleados) {
        this.id = id;
        this.tipo_servicio = tipo_servicio;
        this.descripcion = descripcion;
        this.num_bicicleta = num_bicicleta;
        this.precio_base = precio_base;
        this.precio_total = precio_total;
        this.costo_piezas = costo_piezas;
        this.fecha_ingreso = fecha_ingreso;
        this.estado = estado;
        this.empleado_id = empleado_id;
        this.fecha_entrega = fecha_entrega;
        this.items_empleados = items_empleados;
    }
}
exports.Service = Service;
