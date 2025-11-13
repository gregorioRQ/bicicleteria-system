"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestService = void 0;
const Service_1 = require("../model/Service");
class RequestService {
    constructor(tipo_servicio, num_bicicleta, precio_base, precio_total, costo_piezas, fecha_ingreso, estado = Service_1.Estado.PENDIENTE, empleado_id, fecha_entrega, items_reparacion) {
        this.tipo_servicio = tipo_servicio;
        this.num_bicicleta = num_bicicleta;
        this.precio_base = precio_base;
        this.precio_total = precio_total;
        this.costo_piezas = costo_piezas;
        this.fecha_ingreso = fecha_ingreso;
        this.estado = estado;
        this.empleado_id = empleado_id;
        this.fecha_entrega = fecha_entrega;
        this.items_reparacion = items_reparacion;
    }
}
exports.RequestService = RequestService;
