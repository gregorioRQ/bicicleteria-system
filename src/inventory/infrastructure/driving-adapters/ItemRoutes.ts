import { Router } from "express";
import { ItemController } from "./ItemController";

export const createItemRouter = (controller: ItemController): Router => {
    const router = Router();

    router.all("/", controller.getAll.bind(controller));
    router.get("/:id", controller.getById.bind(controller));
    router.get("/marca/:marca", controller.getByMarca.bind(controller));
    router.post("/crear", controller.create.bind(controller));
    router.delete("/:id", controller.delete.bind(controller));
    router.post("/aumentar-stock", controller.aumentarStock.bind(controller));

    return router;
};

