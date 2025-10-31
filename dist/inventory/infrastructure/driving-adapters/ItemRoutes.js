"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ItemController_1 = require("./ItemController");
const MySQLItemRepository_1 = require("../driven-adapters/MySQLItemRepository");
const ItemUseCase_1 = require("../../application/use-cases/ItemUseCase");
const router = (0, express_1.Router)();
// instanciar el adaptador de base de datos
const itemRepository = new MySQLItemRepository_1.MySQLItemRepository();
// instanciar casos de uso, inyectando el repositorio
const itemUseCases = new ItemUseCase_1.IItemUseCase(itemRepository);
// instanciar el controlador, inyectando el caso de uso
const controller = new ItemController_1.ItemController(itemUseCases);
// definir las rutas y mapear a los métodos del controlador
router.all("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.get("/marca/:marca", controller.getByMarca.bind(controller));
router.post("/crear", controller.create.bind(controller));
router.delete("/:id", controller.delete.bind(controller));
exports.default = router;
