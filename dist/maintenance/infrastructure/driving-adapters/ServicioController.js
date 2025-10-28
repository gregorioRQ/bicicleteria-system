"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceController = void 0;
const Service_js_1 = require("../../domain/model/Service.js");
class ServiceController {
    constructor(serviceUseCases) {
        this.serviceUseCases = serviceUseCases;
    }
    async create(req, res) {
        try {
            const { mecanico_id, tipo_servicio, descripcion, num_cliente, num_bicicleta, precio_base, precio_total, costo_piezas, fecha_ingreso, estado, fecha_entrega } = req.body;
            const newService = new Service_js_1.Service(undefined, tipo_servicio, descripcion, num_cliente, num_bicicleta, precio_base, precio_total, costo_piezas, fecha_ingreso, estado, mecanico_id, fecha_entrega);
            await this.serviceUseCases.registrarServicio(newService);
            res.status(201).json({ message: "Servicio creado" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al crear el servicio" });
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
}
exports.ServiceController = ServiceController;
