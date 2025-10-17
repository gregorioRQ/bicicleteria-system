import { Service } from "../model/Service";

export interface ServiceRepositoryOutPort{
    findAll(): Promise<Service[]>;
    findById(id: number): Promise<Service | null>;
    save(service: Service): Promise<void>;
    delete(id: number): Promise<boolean>;
    updateEstado(id: number, estado: string): Promise<void>;
    update(id: number, s: Service): Promise<void>;
    updateFechaEntrega(id: number, fechaEntrega: Date): Promise<void>;
}