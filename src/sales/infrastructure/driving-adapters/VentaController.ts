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
            return res.status(500).json({message: "Error al registrar la venta", error: (error as Error).message});
        }
    }

    async eliminarVenta(req: Request, res: Response){
        try{
            
        }catch(e){
            console.error(e)
            res.status(500).json({message: "Error al eliminar la venta", error: (e as Error).message});
            throw e;
        }
    }
}