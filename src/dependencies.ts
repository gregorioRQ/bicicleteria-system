import { ServiceController } from "./maintenance/infrastructure/driving-adapters/ServicioController";
import { ServiceUseCases } from "./maintenance/application/use-cases/ServiceUseCases";
import { MySQLServiceRepository } from "./maintenance/infrastructure/driven-adapters/MySQLServiceRepository";
import { ItemCommanAdapter } from "./inventory/infrastructure/driven-adapters/ItemCommandAdapter";
import { MySQLItemRepository } from "./inventory/infrastructure/driven-adapters/MySQLItemRepository";
import { EmpleadoCommandAdapter } from "./sales/infrastructure/driven-adapters/EmpleadoCommandAdapter";
import { MySQLEmpleadoRepository } from "./sales/infrastructure/driven-adapters/MySQLEmpleadoRepository";
import { EmpleadoController } from "./sales/infrastructure/driving-adapters/EmpleadoController";
import { EmpleadoUseCases } from "./sales/application/use-cases/EmpleadoUseCases";
import { VentaController } from "./sales/infrastructure/driving-adapters/VentaController";
import { VentaUseCases } from "./sales/application/use-cases/VentaUseCases";
import { MySQLVentaRepository } from "./sales/infrastructure/driven-adapters/MySQLVentaRepository";
import { ServiceCommandAdapter } from "./maintenance/infrastructure/driven-adapters/ServiceCommandAdapter";
import { ItemController } from "./inventory/infrastructure/driving-adapters/ItemController";
import { IItemUseCase } from "./inventory/application/use-cases/ItemUseCase";

// Repositories
const itemRepository = new MySQLItemRepository();
const empleadoRepository = new MySQLEmpleadoRepository();
const serviceRepository = new MySQLServiceRepository();
const ventaRepository = new MySQLVentaRepository();

// Adapters
const itemCommandAdapter = new ItemCommanAdapter(itemRepository);
const empleadoCommandAdapter = new EmpleadoCommandAdapter(empleadoRepository);
const serviceCommandAdapter = new ServiceCommandAdapter(serviceRepository);

// Use Cases
const itemUseCase = new IItemUseCase(itemRepository);
const serviceUseCases = new ServiceUseCases(serviceRepository, itemCommandAdapter, empleadoCommandAdapter);
const empleadoUseCases = new EmpleadoUseCases(empleadoRepository);
const ventaUseCases = new VentaUseCases(ventaRepository, empleadoRepository, serviceCommandAdapter);

// Controllers
const itemController = new ItemController(itemUseCase);
const serviceController = new ServiceController(serviceUseCases);
const empleadoController = new EmpleadoController(empleadoUseCases);
const ventaController = new VentaController(ventaUseCases);

export const controllers = {
    itemController,
    serviceController,
    empleadoController,
    ventaController,
};
