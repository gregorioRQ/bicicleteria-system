import { ServiceInfoForSale } from "../model/ServiceInfoForSale";

export interface IMaintenanceServicePort{
    getServiceById(id: number): Promise<ServiceInfoForSale | null>;
}