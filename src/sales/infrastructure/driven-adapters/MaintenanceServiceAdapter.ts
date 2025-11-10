import { ServiceUseCases } from "../../../maintenance/application/use-cases/ServiceUseCases";
import { ServiceInfoForSale } from "../../domain/model/ServiceInfoForSale";
import { IMaintenanceServicePort } from "../../domain/ports/IMaintenanceServicePort";

export class MaintenanceServiceAdapter implements IMaintenanceServicePort{

    constructor(private readonly serviceUseCases: ServiceUseCases){}

    async getServiceById(id: number): Promise<ServiceInfoForSale | null> {
        const service = await this.serviceUseCases.obtenerServicioPorId(id);
        if(service && service.id){
            return {
                id: service.id.toString(),
                name: service.tipo_servicio,
                price: service.precio_total
            }
        }
        return null;
    }

}