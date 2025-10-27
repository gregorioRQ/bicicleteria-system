import type { Venta } from "../../domain/model/Venta.js";
import type { VentaRepositoryOutPort } from "../../domain/repositories/VentaRepositoryOutPort.js";


export class VentaUseCases{
    constructor(
        private readonly ventaRepository: VentaRepositoryOutPort
    ){};

    async registrarVenta(v: Venta): Promise<void>{
        
    }
}