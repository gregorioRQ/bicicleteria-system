import { Router } from "express";
import { ServiceController } from "./ServicioController";
import { actualizarServicioSchema, crearServicioSchema } from "./validation/schemas/servicio.schema";
import { validateSchema } from "../../../shared/validationMiddleware";

export const createServiceRouter = (controller: ServiceController): Router => {
    const router = Router();

    router.all("/", controller.getAll.bind(controller));
    router.post("/crear", validateSchema(crearServicioSchema), controller.create.bind(controller));
    router.get("/:id", controller.getById.bind(controller));
    router.delete("/:id", controller.delete.bind(controller));
    router.put("/actualizar", validateSchema(actualizarServicioSchema),controller.actualizarServicio.bind(controller));

    return router;
};