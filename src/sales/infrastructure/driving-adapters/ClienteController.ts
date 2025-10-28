import { ClienteUseCases } from "../../application/use-cases/ClienteUseCases";
import { Cliente } from "../../domain/model/Cliente";
import type { Request, Response } from "express";

export class ClienteController{
    constructor(private clienteUseCase: ClienteUseCases) {};
    
    async crearCliente(req: Request, res: Response){
        try{
            const { nombre, dni, telefono } = req.body;
        const nuevoCliente = new Cliente(undefined, nombre, dni, telefono);

        await this.clienteUseCase.crearCliente(nuevoCliente);
        return res.status(201).json({message: "Cliente creado exitosamente"});
        }catch(error){
            return res.status(500).json({message: "Error al crear el cliente", error});
        }
        
    }

    async obtenerClientes(): Promise<Cliente[]> {
        return this.clienteUseCase.obtenerClientes();
    }

    async obtenerClientePorId(id: number): Promise<Cliente | null> {
        return this.clienteUseCase.obtenerClientePorId(id);
    }

}