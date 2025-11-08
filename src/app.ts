import express from "express";
import cors from "cors";
import { controllers } from "./dependencies";
import { createItemRouter } from "./inventory/infrastructure/driving-adapters/ItemRoutes";
import { createServiceRouter } from "./maintenance/infrastructure/driving-adapters/ServiceRoutes";
import { createSalesRouter } from "./sales/infrastructure/driving-adapters/SalesRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// Create routers with injected controllers
const itemRouter = createItemRouter(controllers.itemController);
const serviceRouter = createServiceRouter(controllers.serviceController);
const salesRouter = createSalesRouter(controllers.ventaController, controllers.empleadoController);

// Rutas
app.use("/api/items", itemRouter);
app.use("/api/maintenance", serviceRouter);
app.use("/api/sales", salesRouter);

export default app;
