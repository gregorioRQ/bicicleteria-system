"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dependencies_1 = require("./dependencies");
const ItemRoutes_1 = require("./inventory/infrastructure/driving-adapters/ItemRoutes");
const ServiceRoutes_1 = require("./maintenance/infrastructure/driving-adapters/ServiceRoutes");
const SalesRoutes_1 = require("./sales/infrastructure/driving-adapters/SalesRoutes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Create routers with injected controllers
const itemRouter = (0, ItemRoutes_1.createItemRouter)(dependencies_1.controllers.itemController);
const serviceRouter = (0, ServiceRoutes_1.createServiceRouter)(dependencies_1.controllers.serviceController);
const salesRouter = (0, SalesRoutes_1.createSalesRouter)(dependencies_1.controllers.ventaController, dependencies_1.controllers.empleadoController);
// Rutas
app.use("/api/items", itemRouter);
app.use("/api/maintenance", serviceRouter);
app.use("/api/sales", salesRouter);
// Error handler global para errores de parsing JSON
const jsonErrorHandler = (err, req, res, next) => {
    if (err instanceof SyntaxError && "body" in err) {
        return res.status(400).json({
            mensaje: "JSON inválido",
            detalle: "Error: El JSON enviado es inválido. Verifica que todos los campos tengan valores."
        });
    }
    res.status(err.status || 500).json({
        mensaje: "Error en el servidor"
    });
};
app.use(jsonErrorHandler);
exports.default = app;
