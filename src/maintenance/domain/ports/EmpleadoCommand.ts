export interface EmpleadoCommand {
    existeEmpleado(id: number): Promise<boolean>;
}