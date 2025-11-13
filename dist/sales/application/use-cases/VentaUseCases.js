"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaUseCases = void 0;
const Venta_1 = require("../../domain/model/Venta");
const VentaResponse_1 = require("../../domain/model/VentaResponse");
class VentaUseCases {
    constructor(ventaRepository, empleadoRepo, maintenanceService) {
        this.ventaRepository = ventaRepository;
        this.empleadoRepo = empleadoRepo;
        this.maintenanceService = maintenanceService;
    }
    ;
    async registrarVenta(v) {
        const empleado_id = Number(v.empleado_id);
        const empleadoExists = await this.empleadoRepo.findById(empleado_id);
        if (!empleadoExists) {
            throw new Error("Empleado no encontrado");
        }
        const services = await this.maintenanceService.getServicesById(v.servicios_ids);
        // calcular total sumando la propiedad `price` de cada ServiceInfoForSale
        const total = services.reduce((sum, svc) => sum + (Number(svc.price) || 0), 0);
        const nuevaVenta = new Venta_1.Venta(undefined, new Date(), total, v.metodo_pago, v.tipo_venta, v.empleado_id, v.cliente_nombre, v.cliente_telefono, v.cliente_dni, v.servicios_ids);
        const res = await this.ventaRepository.save(nuevaVenta);
        if (res == null) {
            throw new Error("No se pudo guardar el servicio");
        }
        const vr = new VentaResponse_1.VentaResponse(res.id, res.total, res.metodo_pago, res.tipo_venta, res.cliente_nombre, res.cliente_dni, services);
        return vr;
    }
    async getVenta(id) {
        //usar el serviceCommand aqui para pedir los datos del servicio
        // al  modulo maintenance
        return null;
    }
    async eliminarVenta(id) {
        if (!id || id === null || id < 0) {
            throw new Error("El id es inválido.");
        }
        try {
            await this.ventaRepository.delete(id);
        }
        catch (err) {
            throw err;
        }
    }
}
exports.VentaUseCases = VentaUseCases;
