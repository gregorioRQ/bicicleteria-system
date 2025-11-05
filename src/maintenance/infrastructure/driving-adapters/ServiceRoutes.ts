import { Router } from "express";
import { MySQLServiceRepository } from "../driven-adapters/MySQLServiceRepository";
import { ServiceUseCases } from "../../application/use-cases/ServiceUseCases";
import { MySQLItemRepository } from "../../../inventory/infrastructure/driven-adapters/MySQLItemRepository";
import { ItemCommanAdapter } from "../../../inventory/infrastructure/driven-adapters/ItemCommandAdapter";
import { ServiceController } from "./ServicioController";
import { MySQLEmpleadoRepository } from "../../../sales/infrastructure/driven-adapters/MySQLEmpleadoRepository";
import { EmpleadoCommandAdapter } from "../../../sales/infrastructure/driven-adapters/EmpleadoCommandAdapter";
import { crearServicioSchema } from "./validation/schemas/servicio.schema";
import { validateSchema } from "../../../shared/validationMiddleware";


const router = Router();
const serviceRepository = new MySQLServiceRepository();
const itemRepository = new MySQLItemRepository();
const itemCommandAdapter = new ItemCommanAdapter(itemRepository);
const empleadoRepository = new MySQLEmpleadoRepository();
const empleadoCommandAdapter = new EmpleadoCommandAdapter(empleadoRepository);
const serviceUseCases = new ServiceUseCases(serviceRepository, itemCommandAdapter, empleadoCommandAdapter);
const controller = new ServiceController(serviceUseCases);

router.all("/", controller.getAll.bind(controller))
router.post("/crear", validateSchema(crearServicioSchema), controller.create.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.delete("/id", controller.delete.bind(controller));
router.put("/actualizar-estado/:id/:estado", controller.updateEstado.bind(controller));

export default router;