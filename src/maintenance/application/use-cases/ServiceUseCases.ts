import formatearFecha from "../../../shared/fechaFormatter";
import { ItemDTO } from "../../domain/model/ItemDTO";
import { RequestService } from "../../domain/model/RequestService";
import { TipoServicio, Estado, Service } from "../../domain/model/Service";
import { ServiceResponse } from "../../domain/model/ServiceResponse";
import type { EmpleadoCommand } from "../../domain/ports/EmpleadoCommand";
import type { ItemCommand } from "../../domain/ports/ItemCommand";
import type { ServiceRepositoryOutPort } from "../../domain/repositories/ServiceRepositoryOutPort";

export class ServiceUseCases{
    constructor(
        private readonly serviceRepo: ServiceRepositoryOutPort,
        private readonly itemCommand: ItemCommand,
        private readonly empleadoCommand: EmpleadoCommand
    ){};

    async registrarServicio(s: RequestService): Promise<ServiceResponse> {

        try{
            if(!await this.empleadoCommand.existeEmpleado(Number(s.empleado_id))){
                throw new Error("El empleado asignado no existe");
            }

            if (!s.num_bicicleta || s.num_bicicleta === 0) {
                throw new Error("El cliente debe tener una bicicleta asociada");
            }
    
            if (s.tipo_servicio !== TipoServicio.REPARACION && s.tipo_servicio !== TipoServicio.CHEQUEO) {
                throw new Error("El tipo de servicio debe ser válido (solo Reparación o Chequeo)");
            }

            if(s.tipo_servicio == TipoServicio.REPARACION && s.precio_base < 2000){
                throw new Error("El precio base minimo para REPARACIÓN es de 2000")
            }

            if(s.tipo_servicio == TipoServicio.CHEQUEO && s.precio_base < 1000){
                throw new Error("El precio base minimo para CHEQUEO es de 1000");
            }
            

            let itemsActualizados: Array<ItemDTO> = [];

            
            if(s.tipo_servicio === TipoServicio.REPARACION && (!s.items_reparacion || s.items_reparacion.length <= 0)){
                throw new Error("Se deben proporcionar los items a descontar del inventario para este servicio de REPARACIÓN");
            }else if(s.tipo_servicio === TipoServicio.REPARACION){
                try{
                    itemsActualizados = await this.itemCommand.descontarStockYobtenerSuPrecioVenta(s.items_reparacion);
                }catch(error){
                    throw new Error("Error al descontar el stock y obtener el precio de venta de los items: " + (error as Error).message);
                }
             
            }
            const totalPiezas = this.calcularPrecioTotaldePiezas(itemsActualizados);
            
                const nuevo_servicio = new Service(
                undefined,
                s.tipo_servicio,
                undefined,
                s.num_bicicleta,
                s.precio_base,
                s.precio_base + totalPiezas,
                totalPiezas,
                s.fecha_ingreso = new Date(),
                s.estado,
                s.empleado_id,
                undefined,
                itemsActualizados
            );

            const ns = await this.serviceRepo.save(nuevo_servicio);
            if(ns === null){
                throw new Error("Ocurrio un problema al guardar el servicio")
            }
            return new ServiceResponse(
                ns.id!,
                ns.tipo_servicio,
                ns.descripcion,
                ns.num_bicicleta,
                ns.precio_base,
                ns.costo_piezas,
                ns.precio_total,
                itemsActualizados,
                ns.estado,
                ns.empleado_id,
                undefined,
                formatearFecha(ns.fecha_ingreso),
            );
            
        } catch (error) {
            console.error("Error al registrar servicio:", error);
            throw error;
        }
            
    }

    calcularPrecioTotaldePiezas(items: Array<{nombre: string, marca: string, coste_final: number}>): number{
        return items.reduce((total, item) => total + item.coste_final, 0);
    };

    async eliminarServicio(id: number): Promise<boolean>{
        const servicio = await this.serviceRepo.findById(id);
        if(!servicio) throw new Error("El servicio no existe o ya fue eliminado.");
        return await this.serviceRepo.delete(id);
    }

    async listarServicios(): Promise<Service[]>{
       return await this.serviceRepo.findAll();
    }

    async obtenerServicioPorId(id: number): Promise<Service | null>{
        return await this.serviceRepo.findById(id);
    }

    async actualizarServicio(sUpdated: Service): Promise<ServiceResponse | null>{
        if(sUpdated.id === undefined){
            throw new Error("El servicio a actualizar debe tener un ID")
        }

        const sOld = await this.serviceRepo.findById(sUpdated.id);
        if (!sOld) throw new Error('Servicio no encontrado');
        if(sUpdated.estado == Estado.FINALIZADO && (!sUpdated.descripcion || !sUpdated.descripcion.trim())){
            throw new Error("Se debe proporcionar una descripción del trabajo realizado antes de marcarlo como FINALIZADO")
        }

        if(sUpdated.estado == Estado.ENTREGADO && sOld.estado !== Estado.FINALIZADO){
            throw new Error("Se debe finalizar el trabajo antes de poder entregarlo")
        }

         if (sUpdated.estado == Estado.ENTREGADO && sOld.estado !== Estado.ENTREGADO) {
            // registrar fecha de entrega real
            sUpdated.fecha_entrega = new Date();
        } else if (sUpdated.fecha_entrega === undefined) {
            sUpdated.fecha_entrega = sOld.fecha_entrega;
        }

        if(sUpdated.items_empleados){
            sUpdated.costo_piezas = this.calcularPrecioTotaldePiezas(sUpdated.items_empleados);
            sUpdated.precio_total = sUpdated.precio_base + sUpdated.costo_piezas;
        }
        
        try{

           const sR =  await this.serviceRepo.update(sUpdated);
           if(sR === null){
            return null
           }else{
             return new ServiceResponse(sR.id!, sR.tipo_servicio, sR.descripcion, sR.num_bicicleta, sR.precio_base, sR.costo_piezas, sR.precio_total,  sR.items_empleados, sR.estado, sR.empleado_id, formatearFecha(sR.fecha_entrega)!, formatearFecha(sR.fecha_ingreso))
           }
          
        }catch(err){
            console.error(err)
            throw new Error("Ocurrió un error al intentar actualizar el servicio");
        }
        
    }
}