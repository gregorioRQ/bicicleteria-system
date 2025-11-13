"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllers = void 0;
const ServicioController_1 = require("./maintenance/infrastructure/driving-adapters/ServicioController");
const ServiceUseCases_1 = require("./maintenance/application/use-cases/ServiceUseCases");
const MySQLServiceRepository_1 = require("./maintenance/infrastructure/driven-adapters/MySQLServiceRepository");
const ItemCommandAdapter_1 = require("./maintenance/infrastructure/driven-adapters/ItemCommandAdapter");
const MySQLItemRepository_1 = require("./inventory/infrastructure/driven-adapters/MySQLItemRepository");
const EmpleadoCommandAdapter_1 = require("./maintenance/infrastructure/driven-adapters/EmpleadoCommandAdapter");
const MySQLEmpleadoRepository_1 = require("./sales/infrastructure/driven-adapters/MySQLEmpleadoRepository");
const EmpleadoController_1 = require("./sales/infrastructure/driving-adapters/EmpleadoController");
const EmpleadoUseCases_1 = require("./sales/application/use-cases/EmpleadoUseCases");
const VentaController_1 = require("./sales/infrastructure/driving-adapters/VentaController");
const VentaUseCases_1 = require("./sales/application/use-cases/VentaUseCases");
const MySQLVentaRepository_1 = require("./sales/infrastructure/driven-adapters/MySQLVentaRepository");
const ItemController_1 = require("./inventory/infrastructure/driving-adapters/ItemController");
const ItemUseCase_1 = require("./inventory/application/use-cases/ItemUseCase");
const MaintenanceServiceAdapter_1 = require("./sales/infrastructure/driven-adapters/MaintenanceServiceAdapter");
// Repositories
const itemRepository = new MySQLItemRepository_1.MySQLItemRepository();
const empleadoRepository = new MySQLEmpleadoRepository_1.MySQLEmpleadoRepository();
const serviceRepository = new MySQLServiceRepository_1.MySQLServiceRepository();
const ventaRepository = new MySQLVentaRepository_1.MySQLVentaRepository();
// Adapters
const itemCommandAdapter = new ItemCommandAdapter_1.ItemCommanAdapter(itemRepository);
const empleadoCommandAdapter = new EmpleadoCommandAdapter_1.EmpleadoCommandAdapter(empleadoRepository);
// Use Cases
const itemUseCase = new ItemUseCase_1.IItemUseCase(itemRepository);
const serviceUseCases = new ServiceUseCases_1.ServiceUseCases(serviceRepository, itemCommandAdapter, empleadoCommandAdapter);
const maintenanceServiceAdapter = new MaintenanceServiceAdapter_1.MaintenanceServiceAdapter(serviceUseCases);
const empleadoUseCases = new EmpleadoUseCases_1.EmpleadoUseCases(empleadoRepository);
const ventaUseCases = new VentaUseCases_1.VentaUseCases(ventaRepository, empleadoRepository, maintenanceServiceAdapter);
// Controllers
const itemController = new ItemController_1.ItemController(itemUseCase);
const serviceController = new ServicioController_1.ServiceController(serviceUseCases);
const empleadoController = new EmpleadoController_1.EmpleadoController(empleadoUseCases);
const ventaController = new VentaController_1.VentaController(ventaUseCases);
exports.controllers = {
    itemController,
    serviceController,
    empleadoController,
    ventaController,
};
