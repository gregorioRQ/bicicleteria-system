import { ServiceInfoForSale } from "../model/ServiceInfoForSale";

export interface IMaintenanceServicePort{
    getServicesById(services_ids: number[]): Promise<ServiceInfoForSale[]>;
}