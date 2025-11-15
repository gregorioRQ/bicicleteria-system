import { Router } from "express";
import { ItemController } from "./ItemController";
import { validateSchema } from "../../../shared/validationMiddleware";
import { actualizarStockSchema, crearItemSchema } from "./validation/schemas/crearItem.schema";

export const createItemRouter = (controller: ItemController): Router => {
    const router = Router();

    router.get("/all", controller.getAll.bind(controller));
    router.get("/:id", controller.getById.bind(controller));
    router.get("/marca/:marca", controller.getByMarca.bind(controller));
    router.post("/crear", validateSchema(crearItemSchema), controller.create.bind(controller));
    router.delete("/:id", controller.delete.bind(controller));
    router.post("/aumentar-stock",validateSchema(actualizarStockSchema), controller.aumentarStock.bind(controller));

    return router;
};

