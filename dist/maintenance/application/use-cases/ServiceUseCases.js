"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUseCases = void 0;
const Service_js_1 = require("../../domain/model/Service.js");
class ServiceUseCases {
    constructor(serviceRepo, itemCommand) {
        this.serviceRepo = serviceRepo;
        this.itemCommand = itemCommand;
    }
    ;
    async registrarServicio(s) {
        if (!s.num_bicicleta.trim()) {
            throw new Error("El cliente debe tener una bicicleta asociada");
        }
        if (s.tipo_servicio !== Service_js_1.TipoServicio.REPARACION && s.tipo_servicio !== Service_js_1.TipoServicio.CHEQUEO) {
            throw new Error("El tipo de servicio debe ser válido (solo Reparación o Chequeo)");
        }
        if (s.tipo_servicio == Service_js_1.TipoServicio.REPARACION && s.precio_base < 2000) {
            throw new Error("El precio base minimo para REPARACIÓN es de 2000");
        }
        if (s.tipo_servicio == Service_js_1.TipoServicio.CHEQUEO && s.precio_base < 1000) {
            throw new Error("El precio base minimo para CHEQUEO es de 1000");
        }
        if (s.tipo_servicio === Service_js_1.TipoServicio.CHEQUEO && (!s.descripcion || !s.descripcion.trim())) {
            throw new Error("Se debe proporcionar una descripción para este tipo de servicio");
        }
        //items a descontar del stock para la reparacion
        this.itemCommand.descontarStock(2, 4);
        s.estado = Service_js_1.Estado.PENDIENTE;
        this.serviceRepo.save(s);
    }
    async actualizarEstadoServicio(id, nuevoEstado) {
        // validar id
        if (typeof id !== 'number' || isNaN(id))
            throw new Error('Id inválido');
        // validar estado
        if (!Object.values(Service_js_1.Estado).includes(nuevoEstado))
            throw new Error('Estado inválido');
        const servicio = await this.serviceRepo.findById(id);
        if (!servicio)
            throw new Error('Servicio no encontrado');
        if (nuevoEstado == Service_js_1.Estado.FINALIZADO && (!servicio.descripcion || !servicio.descripcion.trim())) {
            throw new Error("Se debe proporcionar una descripción del servicio antes de marcarlo como FINALIZADO");
        }
        if (nuevoEstado == Service_js_1.Estado.ENTREGADO && servicio.estado !== Service_js_1.Estado.FINALIZADO) {
            throw new Error("Se debe finalizar el trabajo antes de poder entregarlo");
        }
        if (nuevoEstado === Service_js_1.Estado.ENTREGADO) {
            // registrar fecha de entrega real
            const fechaEntrega = new Date();
            await this.serviceRepo.updateFechaEntrega(id, fechaEntrega);
        }
        await this.serviceRepo.updateEstado(id, nuevoEstado);
    }
    async eliminarServicio(id) {
        const servicio = await this.serviceRepo.findById(id);
        if (!servicio)
            throw new Error("El servicio no existe o ya fue eliminado.");
        await this.serviceRepo.delete(id);
    }
    async listarServicios() {
        return this.serviceRepo.findAll();
    }
    async obtenerServicioPorId(id) {
        return this.serviceRepo.findById(id);
    }
}
exports.ServiceUseCases = ServiceUseCases;
