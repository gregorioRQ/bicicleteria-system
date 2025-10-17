import type { IServiceUseCase } from "../port/in/ServiceUseCase";
import type { IServiceRepository } from "../port/out/ServiceRepository";
import { TipoServicio, type Service } from "../../domain/model/Service";

export class ServiceService implements IServiceUseCase{

    constructor(private serviceRepo: IServiceRepository){};

    listarServicios(): Promise<Service[]> {
        return this.serviceRepo.findAll();
    }
    obtenerServicioPorId(id: number): Promise<Service | null> {
        if (typeof id !== "number" || isNaN(id)) {
            throw new Error("El id debe ser un número válido.");
        }

        return this.serviceRepo.findById(id);
    }

    async registrarServicio(s: Service): Promise<boolean> {
        if (!s.num_bicicleta.trim()) {
            throw new Error("El cliente debe tener una bicicleta asociada");
        }

        if (s.tipo_servicio !== TipoServicio.REPARACION && s.tipo_servicio !== TipoServicio.CHEQUEO) {
            throw new Error("El tipo de servicio debe ser válido (solo Reparación o Chequeo)");
        }

        return this.serviceRepo.save(s);
    }
    eliminarServicio(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}