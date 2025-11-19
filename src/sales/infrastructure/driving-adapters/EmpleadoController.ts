import { ca } from "zod/v4/locales";
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
            console.error(error);
            return res.status(500).json({message: "Error al crear el empleado", error});
        }
        
    }

    async obtenerEmpleados(req: Request, res:Response){
        try{
            const empleados =  await this.empleadoUseCase.obtenerEmpleados();
            return res.status(200).json(empleados);
        }catch(error){
            console.error(error);
            return res.status(500).json({message: "Error al obtener los empleados"});
        }
    }

    async obtenerEmpleadoPorId(req: Request, res: Response){
       try{
            const id = parseInt(req.params.id, 10);
            if(isNaN(id) || id <= 0 || null){
                return res.status(400).json({message: "ID inválido."});
            }
            const empleado = await this.empleadoUseCase.obtenerEmpleadoPorId(id);
            if(empleado){
                return res.status(200).json(empleado);
            }else{
                return res.status(404).json({message: "Empleado no encontrado."});
            }
       }catch(error){
            console.error(error);
            return res.status(500).json({message: "Error al obtener el empleado por ID"});
       }
    }

    async obtenerEmpleadoPorDNI(req: Request, res: Response){
        try{
            const dni = req.params.dni;
            if(!dni || dni.trim() === ""|| dni === "undefined"|| dni === "null"){
                return res.status(400).json({message: "DNI inválido."});
            }
            const empleado = await this.empleadoUseCase.otenerEmpleadoPorDNI(dni);
            if(empleado){
                return  res.status(200).json(empleado);
            }else{
                return res.status(404).json({message: "Empleado no encontrado."});
            }
        }catch(error){
            console.error(error);
            return res.status(500).json({message: "Error al obtener el empleado por DNI"});
        }
    }

    async eliminarEmpleado(req: Request, res: Response){
        try{
            const id = parseInt(req.params.id, 10);
            const eliminado = await this.empleadoUseCase.eliminarEmpleado(id);
            if(eliminado){
                return res.status(200).json({message: "Empleado eliminado exitosamente"});
            }else{
                return res.status(404).json({message: "Empleado no encontrado"});
            }

        }catch(error){
            console.error(error);
            return res.status(500).json({message: "Error al eliminar el empleado"});
        }
    }

}