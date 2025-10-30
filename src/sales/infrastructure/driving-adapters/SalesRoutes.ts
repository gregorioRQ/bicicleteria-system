import { Router } from "express";

import { EmpleadoUseCases } from "../../application/use-cases/EmpleadoUseCases";
import { EmpleadoController } from "../driving-adapters/EmpleadoController";
import { validateSchema } from "./validation/validationMiddleware";
import { crearEmpleadoSchema } from "./validation/schemas/empleado.schema";
import { crearVentaSchema } from "./validation/schemas/venta.schema";
import { VentaUseCases } from "../../application/use-cases/VentaUseCases";
import { MySQLVentaRepository } from "../driven-adapters/MySQLVentaRepository";
import { VentaController } from "./VentaController";
import { MySQLEmpleadoRepository } from "../driven-adapters/MySQLEmpleadoRepository";


const router = Router();
const empleadoRepository = new MySQLEmpleadoRepository();
const empleadoUseCases = new EmpleadoUseCases(empleadoRepository);
const controller = new EmpleadoController(empleadoUseCases);

const ventaRepository = new MySQLVentaRepository();
const ventaUseCases = new VentaUseCases(ventaRepository, empleadoRepository);
const ventaController = new VentaController(ventaUseCases);

router.post("/crear", validateSchema(crearVentaSchema), ventaController.crearVenta.bind(ventaController));

router.post("/empleados/crear", validateSchema(crearEmpleadoSchema), controller.crearEmpleado.bind(controller));


export default router;