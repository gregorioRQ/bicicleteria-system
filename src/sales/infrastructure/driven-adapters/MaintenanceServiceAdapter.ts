import { ServiceUseCases } from "../../../maintenance/application/use-cases/ServiceUseCases";
import { ServiceInfoForSale } from "../../domain/model/ServiceInfoForSale";
import { IMaintenanceServicePort } from "../../domain/ports/IMaintenanceServicePort";

export class MaintenanceServiceAdapter implements IMaintenanceServicePort{

    constructor(private readonly serviceUseCases: ServiceUseCases){}
    
     async getServicesById(services_ids: number[]): Promise<ServiceInfoForSale[]> {
        const services = await this.serviceUseCases.obtenerServiciosById(services_ids);
        return services.map(s => ({
            id: s.id !== undefined ? s.id.toString() : "",
            name: s.tipo_servicio,
            price: s.precio_total,
            descripcion: s.descripcion != undefined ? s.descripcion : ""
        }));
    }

}