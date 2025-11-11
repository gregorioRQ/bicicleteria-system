import { ServiceController } from "./maintenance/infrastructure/driving-adapters/ServicioController";
import { ServiceUseCases } from "./maintenance/application/use-cases/ServiceUseCases";
import { MySQLServiceRepository } from "./maintenance/infrastructure/driven-adapters/MySQLServiceRepository";
import { ItemCommanAdapter } from "./maintenance/infrastructure/driven-adapters/ItemCommandAdapter";
import { MySQLItemRepository } from "./inventory/infrastructure/driven-adapters/MySQLItemRepository";
import { EmpleadoCommandAdapter } from "./maintenance/infrastructure/driven-adapters/EmpleadoCommandAdapter";
import { MySQLEmpleadoRepository } from "./sales/infrastructure/driven-adapters/MySQLEmpleadoRepository";
import { EmpleadoController } from "./sales/infrastructure/driving-adapters/EmpleadoController";
import { EmpleadoUseCases } from "./sales/application/use-cases/EmpleadoUseCases";
import { VentaController } from "./sales/infrastructure/driving-adapters/VentaController";
import { VentaUseCases } from "./sales/application/use-cases/VentaUseCases";
import { MySQLVentaRepository } from "./sales/infrastructure/driven-adapters/MySQLVentaRepository";
import { ItemController } from "./inventory/infrastructure/driving-adapters/ItemController";
import { IItemUseCase } from "./inventory/application/use-cases/ItemUseCase";
import { MaintenanceServiceAdapter } from "./sales/infrastructure/driven-adapters/MaintenanceServiceAdapter";


// Repositories
const itemRepository = new MySQLItemRepository();
const empleadoRepository = new MySQLEmpleadoRepository();
const serviceRepository = new MySQLServiceRepository();
const ventaRepository = new MySQLVentaRepository();

// Adapters
const itemCommandAdapter = new ItemCommanAdapter(itemRepository);
const empleadoCommandAdapter = new EmpleadoCommandAdapter(empleadoRepository);



// Use Cases
const itemUseCase = new IItemUseCase(itemRepository);
const serviceUseCases = new ServiceUseCases(serviceRepository, itemCommandAdapter, empleadoCommandAdapter);
const maintenanceServiceAdapter = new MaintenanceServiceAdapter(serviceUseCases);

const empleadoUseCases = new EmpleadoUseCases(empleadoRepository);
const ventaUseCases = new VentaUseCases(ventaRepository, empleadoRepository, maintenanceServiceAdapter);

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
