import { Empleado } from "../../domain/model/Empleado";
import { EmpleadoRepositoryOutPort } from "../../domain/repositories/EmpleadoRepositoryOutPort";

export class EmpleadoUseCases{
    constructor(
        private readonly empleadoRepository: EmpleadoRepositoryOutPort
    ){}

    async crearEmpleado(empleado: Empleado): Promise<void> {
        if(!empleado){
            throw new Error("Datos del empleado requeridos.")
        }
        const empleadoExistente = await this.empleadoRepository.findByDni(empleado.dni);

        if(empleadoExistente?.dni === empleado.dni){
            throw new Error("El DNI ya está registrado.");
        }
        if(empleadoExistente?.telefono === empleado.telefono){
            throw new Error("El teléfono ya está registrado.");
        }
        await this.empleadoRepository.save(empleado);
    }

    async obtenerEmpleados(): Promise<Empleado[]> {
        return this.empleadoRepository.findAll();
    }

    async obtenerEmpleadoPorId(id: number): Promise<Empleado | null> {
        return this.empleadoRepository.findById(id);
    }

    async eliminarEmpleado(id: number): Promise<boolean> {
        return this.empleadoRepository.delete(id);
    }
}