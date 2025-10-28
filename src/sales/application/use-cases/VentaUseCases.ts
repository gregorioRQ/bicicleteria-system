import type { Venta } from "../../domain/model/Venta";
import type { VentaRepositoryOutPort } from "../../domain/repositories/VentaRepositoryOutPort";


export class VentaUseCases{
    constructor(
        private readonly ventaRepository: VentaRepositoryOutPort
    ){};

    async registrarVenta(v: Venta): Promise<void>{
        
    }
}