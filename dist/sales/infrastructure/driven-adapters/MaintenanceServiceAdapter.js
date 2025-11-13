"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaintenanceServiceAdapter = void 0;
class MaintenanceServiceAdapter {
    constructor(serviceUseCases) {
        this.serviceUseCases = serviceUseCases;
    }
    async getServicesById(services_ids) {
        const services = await this.serviceUseCases.obtenerServiciosById(services_ids);
        return services.map(s => ({
            id: s.id !== undefined ? s.id.toString() : "",
            name: s.tipo_servicio,
            price: s.precio_total,
            descripcion: s.descripcion != undefined ? s.descripcion : ""
        }));
    }
}
exports.MaintenanceServiceAdapter = MaintenanceServiceAdapter;
