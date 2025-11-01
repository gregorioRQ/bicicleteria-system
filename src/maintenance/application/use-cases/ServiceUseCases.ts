import { RequestService } from "../../domain/model/RequestService";
import { TipoServicio, Estado, Service } from "../../domain/model/Service";
import type { EmpleadoCommand } from "../../domain/ports/EmpleadoCommand";
import type { ItemCommand } from "../../domain/ports/ItemCommand";
import type { ServiceRepositoryOutPort } from "../../domain/repositories/ServiceRepositoryOutPort";

export class ServiceUseCases{
    constructor(
        private readonly serviceRepo: ServiceRepositoryOutPort,
        private readonly itemCommand: ItemCommand,
        private readonly empleadoCommand: EmpleadoCommand
    ){};

    async registrarServicio(s: RequestService): Promise<void> {

        try{
            if(!await this.empleadoCommand.existeEmpleado(Number(s.empleado_id))){
                throw new Error("El empleado asignado no existe");
            }

            if (!s.num_bicicleta.trim) {
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
            
             if (s.tipo_servicio === TipoServicio.CHEQUEO && (!s.descripcion || !s.descripcion.trim())) {
                throw new Error("Se debe proporcionar una descripción para este tipo de servicio");
            }

            if(s.tipo_servicio === TipoServicio.REPARACION && (!s.items_reparacion || s.items_reparacion.length === 0)){
                throw new Error("Se deben proporcionar los items a reparar para este servicio de REPARACIÓN");
            }else if(s.tipo_servicio === TipoServicio.REPARACION){
                for(const item of s.items_reparacion){
                    try{
                    await this.itemCommand.descontarStock(item.item_id, item.cantidad);
                    }catch(error){
                        console.error("Error al descontar stock del item:", error);
                        throw new Error("Ocurrio un error al descontar el stock de los items de reparacion");
                    }
                   
                }
            }
            const nuevo_servicio = new Service(
                undefined,
                s.tipo_servicio,
                s.descripcion,
                s.num_bicicleta,
                s.precio_base,
                s.precio_total,
                s.costo_piezas,
                s.fecha_ingreso,
                s.estado,
                s.empleado_id,
                s.fecha_entrega
            );
            return await this.serviceRepo.save(nuevo_servicio);
        } catch (error) {
            console.error("Error al registrar servicio:", error);
            throw error;
        }
            
        }

    async actualizarEstadoServicio(id: number, nuevoEstado: Estado): Promise<void> {
        // validar id
        if (typeof id !== 'number' || isNaN(id)) throw new Error('Id inválido');

        // validar estado
        if (!Object.values(Estado).includes(nuevoEstado)) throw new Error('Estado inválido');

        const servicio = await this.serviceRepo.findById(id);
        if (!servicio) throw new Error('Servicio no encontrado');

        if(nuevoEstado == Estado.FINALIZADO && (!servicio.descripcion || !servicio.descripcion.trim())){
            throw new Error("Se debe proporcionar una descripción del servicio antes de marcarlo como FINALIZADO")
        }

        if(nuevoEstado == Estado.ENTREGADO && servicio.estado !== Estado.FINALIZADO){
            throw new Error("Se debe finalizar el trabajo antes de poder entregarlo")
        }

        if (nuevoEstado === Estado.ENTREGADO) {
            // registrar fecha de entrega real
            const fechaEntrega = new Date();
            await this.serviceRepo.updateFechaEntrega(id, fechaEntrega);
        }

        return await this.serviceRepo.updateEstado(id, nuevoEstado);
    }

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
}