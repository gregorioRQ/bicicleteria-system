import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
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

// Error handler global para errores de parsing JSON
const jsonErrorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
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

export default app;
