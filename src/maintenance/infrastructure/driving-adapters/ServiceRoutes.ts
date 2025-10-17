import { Router } from "express";
import { MySQLServiceRepository } from "../driven-adapters/MySQLServiceRepository";
import { ServiceUseCases } from "../../application/use-cases/ServiceUseCases";
import { MySQLItemRepository } from "../../../inventory/infrastructure/driven-adapters/MySQLitemRepository";
import { ItemCommanAdapter } from "../../../inventory/infrastructure/driven-adapters/ItemCommandAdapter";
import { ServiceController } from "./ServicioController";


const router = Router();
const serviceRepository = new MySQLServiceRepository();
const itemRepository = new MySQLItemRepository();
const itemCommandAdapter = new ItemCommanAdapter(itemRepository);
const serviceUseCases = new ServiceUseCases(serviceRepository, itemCommandAdapter);
const controller = new ServiceController(serviceUseCases);

router.post("/crear", controller.create.bind(controller));

export default router;