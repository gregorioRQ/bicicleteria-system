"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResponse = void 0;
class ServiceResponse {
    constructor(id_servicio, tipo_servicio, descripcion, num_bicicleta, precio_base, coste_total_piezas, precio_total, items_reparacion, estado, empleado_id, fecha_entrega, fecha_ingreso) {
        this.id_servicio = id_servicio;
        this.tipo_servicio = tipo_servicio;
        this.descripcion = descripcion;
        this.num_bicicleta = num_bicicleta;
        this.precio_base = precio_base;
        this.coste_total_piezas = coste_total_piezas;
        this.precio_total = precio_total;
        this.items_reparacion = items_reparacion;
        this.estado = estado;
        this.empleado_id = empleado_id;
        this.fecha_entrega = fecha_entrega;
        this.fecha_ingreso = fecha_ingreso;
    }
}
exports.ServiceResponse = ServiceResponse;
