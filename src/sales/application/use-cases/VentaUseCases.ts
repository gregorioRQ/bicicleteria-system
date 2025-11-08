import { Empleado } from "../../domain/model/Empleado";
import type { Venta } from "../../domain/model/Venta";
import type { VentaRepositoryOutPort } from "../../domain/repositories/VentaRepositoryOutPort";
import type { EmpleadoRepositoryOutPort } from "../../domain/repositories/EmpleadoRepositoryOutPort";
import { VentaResponse } from "../../domain/model/VentaResponse";
import { ServiceCommand } from "../../domain/ports/ServiceCommand";


export class VentaUseCases{
    constructor(
        private readonly ventaRepository: VentaRepositoryOutPort,
        private readonly empleadoRepository: EmpleadoRepositoryOutPort,
        private readonly serviceCommand: ServiceCommand
    ){};

    async registrarVenta(v: Venta): Promise<void>{
        const empleado_id = Number(v.empleado_id);
        const empleado = await this.empleadoRepository.findById(empleado_id);
        if(empleado === null){
            throw new Error("Empleado no encontrado");
        }
        if(!await this.serviceCommand.obtenerServicios(Number(v.servicio_id))){
            throw new Error("Servicio no encontrado")
        }
        await this.ventaRepository.save(v);
    }

    async getVenta(id: number): Promise<VentaResponse | null>{
        //usar el serviceCommand aqui para pedir los datos del servicio
        // al  modulo maintenance
        return null;
    }
}