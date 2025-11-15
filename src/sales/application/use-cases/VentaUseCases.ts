import { Venta } from "../../domain/model/Venta";
import type { VentaRepositoryOutPort } from "../../domain/repositories/VentaRepositoryOutPort";
import { VentaResponse } from "../../domain/model/VentaResponse";
import { IMaintenanceServicePort } from "../../domain/ports/IMaintenanceServicePort";
import { MySQLEmpleadoRepository } from "../../infrastructure/driven-adapters/MySQLEmpleadoRepository";
import { VentaRequest } from "../../domain/model/VentaRequest";
import { th } from "zod/v4/locales";



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
        
        // calcular total sumando la propiedad `price` de cada ServiceInfoForSale
        const total = services.reduce((sum, svc) => sum + (Number(svc.price) || 0), 0);

        const nuevaVenta = new Venta(
            undefined, 
            new Date(),
            total,
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

    async getVentaById(id: number): Promise<VentaResponse>{
       try{
        if(!id || id===null || id < 0){
            throw new Error("El id es inválido.")
        }
        const venta =  await this.ventaRepository.findById(id);
            if(!venta){
                throw new Error("La venta no existe.");
            }
        console.log("Venta encontrada:", venta);
            const services = await this.maintenanceService.getServicesById(venta.servicios_ids);
            return new VentaResponse(
                venta.id!,
                venta.total,
                venta.metodo_pago,
                venta.tipo_venta,
                venta.cliente_nombre,
                venta.cliente_dni,
                services
            );
        }catch(err){
            throw err
        }
       
    }

    async listarVentas(): Promise<Venta[]>{
        return await this.ventaRepository.findAll();
    }

    async eliminarVenta(id: number): Promise<boolean>{
        if(!id || id===null || id < 0){
            throw new Error("El id es inválido.")
        }
        try{
            if(!await this.ventaRepository.findById(id)){
                throw new Error("La venta no existe o ya fue eliminada.");
            }

            return await this.ventaRepository.delete(id);
        }catch(err){
            throw err
        }
    }
}