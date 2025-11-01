import { EmpleadoCommand } from "../../../maintenance/domain/ports/EmpleadoCommand";
import { EmpleadoRepositoryOutPort } from "../../domain/repositories/EmpleadoRepositoryOutPort";


export class EmpleadoCommandAdapter implements EmpleadoCommand{
    constructor(private readonly empleadoRepo: EmpleadoRepositoryOutPort){};
    async existeEmpleado(id: number): Promise<boolean> {
        // retorna true si el empleado existe, false si no
        try {
            const empleado = await this.empleadoRepo.findById(id);
            return empleado !== null;
        } catch (error) {
            console.error("Error al verificar existencia del empleado:", error);
            return false;
        }
    }
}
