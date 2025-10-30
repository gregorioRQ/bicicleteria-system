import { Empleado } from "../model/Empleado";

export interface EmpleadoRepositoryOutPort {
    findAll(): Promise<Empleado[]>;
    findById(id: number): Promise<Empleado | null>;
    save(empleado: Empleado): Promise<void>;
    delete(id: number): Promise<boolean>;
    findByDni(dni: string): Promise<Empleado | null>;
}