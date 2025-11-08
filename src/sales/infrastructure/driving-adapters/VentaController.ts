import { VentaUseCases } from "../../application/use-cases/VentaUseCases";
import type { Request, Response } from "express";
import { Venta } from "../../domain/model/Venta";

export class VentaController {
    constructor(private readonly ventaUseCase: VentaUseCases){};

    async crearVenta(req: Request, res: Response){
        try {
            const { total, metodo_pago, tipo_venta, empleado_id,servicio_id, cliente_nombre, cliente_telefono, cliente_dni } = req.body;

            const nuevaVenta = new Venta(undefined, undefined, total, metodo_pago, tipo_venta, empleado_id, servicio_id, cliente_nombre, cliente_telefono, cliente_dni);

            await this.ventaUseCase.registrarVenta(nuevaVenta);
            return res.status(201).json({message: "Venta registrada exitosamente"});
        } catch (error) {
            return res.status(500).json({message: "Error al registrar la venta", error: (error as Error).message});
        }
    }
}