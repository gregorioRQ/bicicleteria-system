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
        console.log("Empleado a crear:", empleado);
        await this.empleadoRepository.save(empleado);
    }

    async obtenerEmpleados(): Promise<Empleado[]> {
        return this.empleadoRepository.findAll();
    }

    async obtenerEmpleadoPorId(id: number): Promise<Empleado | null> {
        return this.empleadoRepository.findById(id);
    }

     async otenerEmpleadoPorDNI(dni: string): Promise<Empleado | null> {
            try{
                if(!dni || dni.trim() === ""|| dni === "undefined"|| dni === "null"){
                    throw new Error("DNI inválido.");
                }
                const empleado = await this.empleadoRepository.findByDni(dni);
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