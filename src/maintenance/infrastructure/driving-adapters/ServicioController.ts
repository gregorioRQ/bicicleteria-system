import type { Request, Response } from "express";
import type { ServiceUseCases } from "../../application/use-cases/ServiceUseCases.js";
import { Service } from "../../domain/model/Service.js";


export class ServiceController{
    constructor(private readonly serviceUseCases: ServiceUseCases){}

    async create(req: Request, res: Response){
        try{

            const {mecanico_id, tipo_servicio, descripcion, num_cliente, num_bicicleta, precio_base, precio_total, costo_piezas, fecha_ingreso, estado, fecha_entrega
            } = req.body;

            const newService = new Service(mecanico_id, tipo_servicio, descripcion, num_cliente, num_bicicleta, precio_base, precio_total, costo_piezas, fecha_ingreso, estado, fecha_entrega );
            await this.serviceUseCases.registrarServicio(newService);
            res.status(201).json({message: "Servicio creado"});
        }catch(error){
            console.error(error);
            res.status(500).json({message: "Error al crear el servicio"})
        }

    }
}