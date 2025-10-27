import { TipoServicio, Estado, type Service } from "../../domain/model/Service.js";
import type { ItemCommand } from "../../domain/ports/ItemCommand.js";
import type { ServiceRepositoryOutPort } from "../../domain/repositories/ServiceRepositoryOutPort.js";

export class ServiceUseCases{
    constructor(
        private readonly serviceRepo: ServiceRepositoryOutPort,
        private readonly itemCommand: ItemCommand
    ){};

    async registrarServicio(s: Service): Promise<void> {
            if (!s.num_bicicleta.trim()) {
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
            //items a descontar del stock para la reparacion
            this.itemCommand.descontarStock(2, 4);
            s.estado = Estado.PENDIENTE;
            this.serviceRepo.save(s);
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

        await this.serviceRepo.updateEstado(id, nuevoEstado);
    }
}