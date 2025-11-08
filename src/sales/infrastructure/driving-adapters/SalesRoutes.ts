import { Router } from "express";
import { validateSchema } from "../../../shared/validationMiddleware";
import { crearEmpleadoSchema } from "./validation/schemas/empleado.schema";
import { crearVentaSchema } from "./validation/schemas/venta.schema";
import { VentaController } from "./VentaController";
import { EmpleadoController } from "./EmpleadoController";

export const createSalesRouter = (ventaController: VentaController, empleadoController: EmpleadoController): Router => {
    const router = Router();

    router.post("/crear", validateSchema(crearVentaSchema), ventaController.crearVenta.bind(ventaController));
    router.post("/empleados/crear", validateSchema(crearEmpleadoSchema), empleadoController.crearEmpleado.bind(empleadoController));

    return router;
};