
import { Empleado } from "../../domain/model/Empleado";
import { EmpleadoRepositoryOutPort } from "../../domain/repositories/EmpleadoRepositoryOutPort";

export class EmpleadoUseCases{
    constructor(
        private readonly empleadoRepository: EmpleadoRepositoryOutPort
    ){}

    async crearEmpleado(empleado: Empleado): Promise<void> {
        try{
             if(!empleado){
            throw new Error("Datos del empleado requeridos.")
        }
        
        const dniExistente = await this.empleadoRepository.findByDni(empleado.dni);
        if(dniExistente){
            throw new Error("El DNI ya está registrado.");
        }

        const telefonoExistente = await this.empleadoRepository.findByTelefono(empleado.telefono);
        if(telefonoExistente){
            throw new Error("El teléfono ya está registrado.");
        }
        
        await this.empleadoRepository.save(empleado);
        }catch(error){
            throw error
        }
       
    }

    async obtenerEmpleados(): Promise<Empleado[]> {
        return this.empleadoRepository.findAll();
    }

    async obtenerEmpleadoPorId(id: number): Promise<Empleado | null> {
        return this.empleadoRepository.findById(id);
    }

     async otenerEmpleadoPorDNI(dni: string): Promise<Empleado | null> {
            try{
                if(!dni || !dni.trim()){
                    throw new Error("DNI inválido.");
                }
                const empleado = await this.empleadoRepository.findByDni(dni.trim());
                return empleado;
            }catch(error){
                throw new Error("Error al obtener el empleado por DNI: " + error);
            }
        }

    async eliminarEmpleado(id: number | bigint): Promise<boolean> {
        if(!id || id <= 0 || id === null){
            throw new Error("ID inválido.");
        }

        if(await this.empleadoRepository.findById(id as any) === null){
            throw new Error("Empleado no encontrado.");
        }

        return this.empleadoRepository.delete(id as any);
    }
}