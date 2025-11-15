import { VentaUseCases } from "../../application/use-cases/VentaUseCases";
import type { Request, Response } from "express";
import { Venta } from "../../domain/model/Venta";
import { VentaRequest } from "../../domain/model/VentaRequest";

export class VentaController {
    constructor(private readonly ventaUseCase: VentaUseCases){};

    async crearVenta(req: Request, res: Response){
        try {
            const { metodo_pago, tipo_venta, empleado_id, cliente_nombre, cliente_telefono, cliente_dni, servicios_ids } = req.body;

            const nuevaVenta = new VentaRequest(cliente_nombre, cliente_dni, cliente_telefono, empleado_id, metodo_pago, tipo_venta, servicios_ids);

            const result = await this.ventaUseCase.registrarVenta(nuevaVenta);
            return res.status(201).json({message: "Venta registrada exitosamente", result});
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error al registrar la venta", error: (error as Error).message});
        }
    }

    async eliminarVenta(req: Request, res: Response){
        try{
            if(!req.params.id){
                return res.status(400).json({message: "id es requerido"});
            }
            const id = parseInt(req.params.id);
            const result = await this.ventaUseCase.eliminarVenta(id);
            if(result){
                return res.status(200).json({message: "Venta eliminada exitosamente"});
            } else {
                return res.status(404).json({message: "Venta no encontrada"});
            }
        }catch(e){
            res.status(500).json({message: "Error al eliminar la venta", error: (e as Error).message});
            console.error(e);
        }
    }

    async obtenerVentas(req: Request, res: Response){
        try{
            const ventas = await this.ventaUseCase.listarVentas();
            return res.status(200).json(ventas);
        }catch(e){
            res.status(500).json({message: "Error al obtener las ventas", error: (e as Error).message});
            console.error(e);
        }
    }

    async obtenerVentaPorId(req: Request, res: Response){
        try{
            if(!req.params.id){
                return res.status(400).json({message: "id es requerido"});
            }
            const id = parseInt(req.params.id);
            if(Number.isNaN(id) || id < 0 || !id || id === null || id === undefined){
                return res.status(400).json({message: "id es inválido"});
            }
           
            const venta = await this.ventaUseCase.getVentaById(id);
            return res.status(200).json(venta);
        }catch(e){
            res.status(500).json({message: "Error al obtener la venta"});
            console.error(e);          
        }
    }
}