import { Router } from "express";
import { ItemController } from "./ItemController";
import { MySQLItemRepository } from "../driven-adapters/MySQLItemRepository";
import { IItemUseCase } from "../../application/use-cases/ItemUseCase";

const router = Router();
// instanciar el adaptador de base de datos
const itemRepository = new MySQLItemRepository();

// instanciar casos de uso, inyectando el repositorio
const itemUseCases = new IItemUseCase(itemRepository);
// instanciar el controlador, inyectando el caso de uso
const controller = new ItemController(itemUseCases);


// definir las rutas y mapear a los métodos del controlador
router.all("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.get("/marca/:marca", controller.getByMarca.bind(controller));
router.post("/crear", controller.create.bind(controller));
router.delete("/:id", controller.delete.bind(controller));

export default router;
