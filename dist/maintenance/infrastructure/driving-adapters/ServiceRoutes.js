"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServiceRouter = void 0;
const express_1 = require("express");
const servicio_schema_1 = require("./validation/schemas/servicio.schema");
const validationMiddleware_1 = require("../../../shared/validationMiddleware");
const createServiceRouter = (controller) => {
    const router = (0, express_1.Router)();
    router.all("/", controller.getAll.bind(controller));
    router.post("/crear", (0, validationMiddleware_1.validateSchema)(servicio_schema_1.crearServicioSchema), controller.create.bind(controller));
    router.get("/:id", controller.getById.bind(controller));
    router.delete("/:id", controller.delete.bind(controller));
    router.put("/actualizar", (0, validationMiddleware_1.validateSchema)(servicio_schema_1.actualizarServicioSchema), controller.actualizarServicio.bind(controller));
    return router;
};
exports.createServiceRouter = createServiceRouter;
