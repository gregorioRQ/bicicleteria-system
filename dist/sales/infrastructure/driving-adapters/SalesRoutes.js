"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSalesRouter = void 0;
const express_1 = require("express");
const validationMiddleware_1 = require("../../../shared/validationMiddleware");
const venta_schema_1 = require("./validation/schemas/venta.schema");
const createSalesRouter = (ventaController, empleadoController) => {
    const router = (0, express_1.Router)();
    router.post("/crear", (0, validationMiddleware_1.validateSchema)(venta_schema_1.crearVentaSchema), ventaController.crearVenta.bind(ventaController));
    router.post("/empleados/crear", /*validateSchema(crearEmpleadoSchema),*/ empleadoController.crearEmpleado.bind(empleadoController));
    return router;
};
exports.createSalesRouter = createSalesRouter;
