"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceService = void 0;
const Service_1 = require("../../domain/model/Service");
class ServiceService {
    constructor(serviceRepo) {
        this.serviceRepo = serviceRepo;
    }
    ;
    listarServicios() {
        return this.serviceRepo.findAll();
    }
    obtenerServicioPorId(id) {
        if (typeof id !== "number" || isNaN(id)) {
            throw new Error("El id debe ser un número válido.");
        }
        return this.serviceRepo.findById(id);
    }
    async registrarServicio(s) {
        if (!s.num_bicicleta.trim()) {
            throw new Error("El cliente debe tener una bicicleta asociada");
        }
        if (s.tipo_servicio !== Service_1.TipoServicio.REPARACION && s.tipo_servicio !== Service_1.TipoServicio.CHEQUEO) {
            throw new Error("El tipo de servicio debe ser válido (solo Reparación o Chequeo)");
        }
        return this.serviceRepo.save(s);
    }
    eliminarServicio(id) {
        throw new Error("Method not implemented.");
    }
}
exports.ServiceService = ServiceService;
