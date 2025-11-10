import { Venta } from "../../domain/model/Venta";

export interface VentaRepositoryOutPort{
    findAll(): Promise<Venta[]>
    findById(id: number): Promise<Venta | null>;
    save(venta: Venta): Promise<Venta | null>;
    delete(id: number): Promise<boolean>; 
    update(id: number, venta: Venta): Promise<boolean>;
}