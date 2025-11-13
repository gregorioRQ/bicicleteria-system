"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItemRouter = void 0;
const express_1 = require("express");
const validationMiddleware_1 = require("../../../shared/validationMiddleware");
const crearItem_schema_1 = require("./validation/schemas/crearItem.schema");
const createItemRouter = (controller) => {
    const router = (0, express_1.Router)();
    router.all("/", controller.getAll.bind(controller));
    router.get("/:id", controller.getById.bind(controller));
    router.get("/marca/:marca", controller.getByMarca.bind(controller));
    router.post("/crear", (0, validationMiddleware_1.validateSchema)(crearItem_schema_1.crearItemSchema), controller.create.bind(controller));
    router.delete("/:id", controller.delete.bind(controller));
    router.post("/aumentar-stock", (0, validationMiddleware_1.validateSchema)(crearItem_schema_1.actualizarStockSchema), controller.aumentarStock.bind(controller));
    return router;
};
exports.createItemRouter = createItemRouter;
