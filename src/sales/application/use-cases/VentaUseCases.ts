import { Empleado } from "../../domain/model/Empleado";
import type { Venta } from "../../domain/model/Venta";
import type { VentaRepositoryOutPort } from "../../domain/repositories/VentaRepositoryOutPort";
import type { EmpleadoRepositoryOutPort } from "../../domain/repositories/EmpleadoRepositoryOutPort";


export class VentaUseCases{
    constructor(
        private readonly ventaRepository: VentaRepositoryOutPort,
        private readonly empleadoRepository: EmpleadoRepositoryOutPort
    ){};

    async registrarVenta(v: Venta): Promise<void>{
        const empleado_id = Number(v.empleado_id);
        const empleado = await this.empleadoRepository.findById(empleado_id);
        if(empleado === null){
            throw new Error("Empleado no encontrado");
        }
        await this.ventaRepository.save(v);
    }
}