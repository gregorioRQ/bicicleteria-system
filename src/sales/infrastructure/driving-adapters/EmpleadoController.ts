import { EmpleadoUseCases } from "../../application/use-cases/EmpleadoUseCases";
import { Empleado } from "../../domain/model/Empleado";
import type { Request, Response } from "express";

export class EmpleadoController{
    constructor(private empleadoUseCase: EmpleadoUseCases) {};
    
    async crearEmpleado(req: Request, res: Response){
        try{
            const { nombre, dni, telefono, rol } = req.body;
        const nuevoEmpleado = new Empleado(undefined, nombre, dni, rol, telefono);
        
        await this.empleadoUseCase.crearEmpleado(nuevoEmpleado);
        return res.status(201).json({message: "Empleado creado exitosamente"});
        }catch(error){
            return res.status(500).json({message: "Error al crear el empleado", error});
        }
        
    }

    async obtenerEmpleados(): Promise<Empleado[]> {
        return this.empleadoUseCase.obtenerEmpleados();
    }

    async obtenerEmpleadoPorId(id: number): Promise<Empleado | null> {
        return this.empleadoUseCase.obtenerEmpleadoPorId(id);
    }

}