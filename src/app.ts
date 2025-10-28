import express from "express";
import cors from "cors";
import itemRoutes from "./inventory/infrastructure/driving-adapters/ItemRoutes";
import serviceRoutes from "./maintenance/infrastructure/driving-adapters/ServiceRoutes";
import salesRoutes from "./sales/infrastructure/driving-adapters/SalesRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/items", itemRoutes);
app.use("/api/maintenance", serviceRoutes);
app.use("/api/sales", salesRoutes);

export default app;
