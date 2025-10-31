"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ItemRoutes_1 = __importDefault(require("./inventory/infrastructure/driving-adapters/ItemRoutes"));
const ServiceRoutes_1 = __importDefault(require("./maintenance/infrastructure/driving-adapters/ServiceRoutes"));
const SalesRoutes_1 = __importDefault(require("./sales/infrastructure/driving-adapters/SalesRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rutas
app.use("/api/items", ItemRoutes_1.default);
app.use("/api/maintenance", ServiceRoutes_1.default);
app.use("/api/sales", SalesRoutes_1.default);
exports.default = app;
