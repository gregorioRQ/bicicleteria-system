import type { Request, Response } from "express";
import type { ServiceUseCases } from "../../application/use-cases/ServiceUseCases";
import { Service } from "../../domain/model/Service";
import { RequestService } from "../../domain/model/RequestService";


export class ServiceController{
    constructor(private readonly serviceUseCases: ServiceUseCases){}

    async create(req: Request, res: Response){
        try{
            if(!req.body || Object.keys(req.body).length === 0){
                return res.status(400).json({message: "Cuerpo de la solicitud vacío"});
            }

            const {empleado_id, tipo_servicio, descripcion, num_bicicleta, precio_base, precio_total, costo_piezas, fecha_ingreso, estado, fecha_entrega, items_reparacion
            } = req.body;

            const newService = new RequestService(tipo_servicio, descripcion, num_bicicleta, precio_base, precio_total, costo_piezas, fecha_ingreso, estado, empleado_id, undefined, items_reparacion);
            await this.serviceUseCases.registrarServicio(newService);
            res.status(201).json({message: "Servicio creado"});
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Error al crear el servicio"});
        
        }

    }

    async getAll(req: Request, res: Response){
        try{
            const services = await this.serviceUseCases.listarServicios();
            res.status(200).json(services);
        }catch (err){
            console.log(err);
            res.status(500).json({message: "Error al obtener los servicios."})
        }
    }

    async delete(req: Request, res: Response){
        try{
            const idParam = req.params.id;
            if (!idParam) {
                return res.status(400).json({ message: "id es requerido" });
            }

            const id = parseInt(idParam, 10);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: "id debe ser un número válido" });
            }

            await this.serviceUseCases.eliminarServicio(id);
            res.status(200).json({message: "Servicio eliminado."});
        }catch(e){
            console.log(e);
            res.status(500).json({message: "Error al eliminar el servicio"})
        }
    }

    async getById(req: Request, res:Response){
        try{
            const idParam = req.params.id;
            if (!idParam) {
                return res.status(400).json({ message: "id es requerido" });
            }

            const id = parseInt(idParam, 10);

            if (Number.isNaN(id)) {
                return res.status(400).json({ message: "id debe ser un número válido" });
            }
            const s = await this.serviceUseCases.obtenerServicioPorId(id);
            if(!s){
                return res.status(404).json({message: "Servicio no encontrado"});
            }
            res.status(200).json(s);
        }catch(e){
            res.status(500).json({message: "Error al obtener el servicio"})
        }
    }
}