import { Venta } from "../../domain/model/Venta";

export interface VentaRepositoryOutPort{
    findAll(): Promise<Venta[]>
    findById(id: number): Promise<Venta | null>;
    save(venta: Venta): Promise<void>;
    delete(id: number): Promise<boolean>; 
}