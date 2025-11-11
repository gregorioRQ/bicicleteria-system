import { Venta } from "../../domain/model/Venta";
import type { VentaRepositoryOutPort } from "../../domain/repositories/VentaRepositoryOutPort";
import { VentaResponse } from "../../domain/model/VentaResponse";
import { IMaintenanceServicePort } from "../../domain/ports/IMaintenanceServicePort";
import { MySQLEmpleadoRepository } from "../../infrastructure/driven-adapters/MySQLEmpleadoRepository";
import { VentaRequest } from "../../domain/model/VentaRequest";



export class VentaUseCases{
    constructor(
        private readonly ventaRepository: VentaRepositoryOutPort,
        private readonly empleadoRepo: MySQLEmpleadoRepository,
        private readonly maintenanceService: IMaintenanceServicePort
    ){};

    async registrarVenta(v: VentaRequest): Promise<VentaResponse>{
        const empleado_id = Number(v.empleado_id);
        const empleadoExists = await this.empleadoRepo.findById(empleado_id);
        if(!empleadoExists){
            throw new Error("Empleado no encontrado");
        }
        
        const services = await this.maintenanceService.getServicesById(v.servicios_ids)

        const nuevaVenta = new Venta(
            undefined, 
            new Date(),
            // hay que hallar un metodo para calcular el total
            39,
            v.metodo_pago,
            v.tipo_venta,
            v.empleado_id,
            v.cliente_nombre,
            v.cliente_telefono,
            v.cliente_dni,
            v.servicios_ids
        )
        
        const res = await this.ventaRepository.save(nuevaVenta);
        if(res == null){
            throw new Error("No se pudo guardar el servicio")
        }
        const vr = new VentaResponse(
            res.id!,
            res.total,
            res.metodo_pago,
            res.tipo_venta,
            res.cliente_nombre,
            res.cliente_dni,
            services
        );
        return vr;
    }

    async getVenta(id: number): Promise<VentaResponse | null>{
        //usar el serviceCommand aqui para pedir los datos del servicio
        // al  modulo maintenance
        return null;
    }
}