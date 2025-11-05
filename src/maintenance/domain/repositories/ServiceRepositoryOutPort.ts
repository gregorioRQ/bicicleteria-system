import { Service } from "../model/Service";

export interface ServiceRepositoryOutPort{
    findAll(): Promise<Service[]>;
    findById(id: number): Promise<Service | null>;
    save(service: Service): Promise<void>;
    delete(id: number): Promise<boolean>;
    updateEstado(id: number, estado: string): Promise<boolean>;
    update(s: Service): Promise<boolean>;
    updateFechaEntrega(id: number, fechaEntrega: Date): Promise<void>;
}