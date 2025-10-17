import express from "express";
import cors from "cors";
import itemRoutes from "./inventory/infrastructure/driving-adapters/ItemRoutes.js";
import serviceRoutes from "./maintenance/infrastructure/driving-adapters/ServiceRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/items", itemRoutes);
app.use("/api/service", serviceRoutes);

export default app;
