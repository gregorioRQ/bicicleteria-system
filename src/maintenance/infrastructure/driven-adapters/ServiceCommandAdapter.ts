import { ServiceCommand } from "../../../sales/domain/ports/ServiceCommand";
import { ServiceRepositoryOutPort } from "../../domain/repositories/ServiceRepositoryOutPort";

export class ServiceCommandAdapter implements ServiceCommand{

    constructor(private readonly serviceRepo: ServiceRepositoryOutPort){};

    async obtenerServicios(id: number): Promise<boolean> {
        if(await this.serviceRepo.findById(id) != null){
            return true;
        }else{
            return false;
        }
    }

}