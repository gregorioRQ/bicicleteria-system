import { Router } from "express";
import { MySQLClienteRepository } from "../driven-adapters/MySQLClienteRepository";
import { ClienteUseCases } from "../../application/use-cases/ClienteUseCases";
import { ClienteController } from "./ClienteController";
import { validateSchema } from "./validation/validationMiddleware";
import { crearClienteSchema } from "./validation/schemas/cliente.schema";


const router = Router();
const clienteRepository = new MySQLClienteRepository();
const clienteUseCases = new ClienteUseCases(clienteRepository);
const controller = new ClienteController(clienteUseCases);

router.post("/crear", validateSchema(crearClienteSchema), controller.crearCliente.bind(controller));


export default router;