"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const Service_1 = require("../../domain/model/Service");
const RequestService_1 = require("../../domain/model/RequestService");
class ServiceController {
    constructor(serviceUseCases) {
        this.serviceUseCases = serviceUseCases;
    }
    async create(req, res) {
        try {
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: "Cuerpo de la solicitud vacío" });
            }
            const { empleado_id, tipo_servicio, num_bicicleta, precio_base, precio_total, costo_piezas, fecha_ingreso, estado, items_reparacion } = req.body;
            const newService = new RequestService_1.RequestService(tipo_servicio, num_bicicleta, precio_base, precio_total, costo_piezas, undefined, estado, empleado_id, undefined, items_reparacion);
            const serviceResponse = await this.serviceUseCases.registrarServicio(newService);
            res.status(201).json(serviceResponse);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al crear el servicio", error: error.message });
        }
    }
    async getAll(req, res) {
        try {
            const services = await this.serviceUseCases.listarServicios();
            res.status(200).json(services);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error al obtener los servicios." });
        }
    }
    async delete(req, res) {
        try {
            const idParam = req.params.id;
            if (!idParam) {
                return res.status(400).json({ message: "id es requerido" });
            }
            const id = parseInt(idParam, 10);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: "id debe ser un número válido" });
            }
            await this.serviceUseCases.eliminarServicio(id);
            res.status(200).json({ message: "Servicio eliminado." });
        }
        catch (e) {
            console.log(e);
            res.status(500).json({ message: "Error al eliminar el servicio" });
        }
    }
    async getById(req, res) {
        try {
            const idParam = req.params.id;
            if (!idParam) {
                return res.status(400).json({ message: "id es requerido" });
            }
            const id = parseInt(idParam, 10);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: "id debe ser un número válido" });
            }
            const s = await this.serviceUseCases.obtenerServicioPorId(id);
            if (!s) {
                return res.status(404).json({ message: "Servicio no encontrado" });
            }
            res.status(200).json(s);
        }
        catch (e) {
            res.status(500).json({ message: "Error al obtener el servicio" });
        }
    }
    async actualizarServicio(req, res) {
        try {
            const body = req.body;
            if (!body || Object.keys(req.body).length === 0) {
                return res.status(400).json({
                    message: "Cuerpo de la solicitud vacío"
                });
            }
            const { id, tipo_servicio, descripcion, num_bicicleta, precio_base, costo_piezas, precio_total, items_reparacion, estado, empleado_id, fecha_ingreso } = body;
            const servUp = new Service_1.Service(id, tipo_servicio, descripcion, num_bicicleta, precio_base, precio_total, costo_piezas, fecha_ingreso, estado, empleado_id, undefined, items_reparacion);
            const s = await this.serviceUseCases.actualizarServicio(servUp);
            if (s === null) {
                return res.status(404).json({
                    message: "Error al intentar actualizar el servicio"
                });
            }
            else {
                return res.status(200).json(s);
            }
        }
        catch (err) {
            res.status(500).json({ message: "Error ", error: err.message });
        }
    }
    ;
}
exports.ServiceController = ServiceController;
