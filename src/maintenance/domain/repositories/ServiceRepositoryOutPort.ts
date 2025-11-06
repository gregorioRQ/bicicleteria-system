import { Service } from "../model/Service";

export interface ServiceRepositoryOutPort{
    findAll(): Promise<Service[]>;
    findById(id: number): Promise<Service | null>;
    save(service: Service): Promise<Service |null>;
    delete(id: number): Promise<boolean>;
    updateEstado(id: number, estado: string): Promise<boolean>;
    update(s: Service): Promise<Service | null>;
    updateFechaEntrega(id: number, fechaEntrega: Date): Promise<void>;
}