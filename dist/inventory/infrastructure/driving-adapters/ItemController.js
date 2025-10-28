"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemController = void 0;
const Item_js_1 = require("../../domain/model/Item.js");
/**
 * Adaptador de Entrada: Controlador rest.
 * Usa el puerto de entrada (interfaz ItemUseCase), no el repositorio directo.
 */
class ItemController {
    constructor(itemUseCase) {
        this.itemUseCase = itemUseCase;
    }
    async getAll(req, res) {
        try {
            const items = await this.itemUseCase.listarItems();
            res.status(200).json(items);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener los ítems" });
        }
    }
    async getById(req, res) {
        try {
            const idParam = req.params.id;
            if (!idParam) {
                return res.status(400).json({ message: "id es requerido" });
            }
            const id = parseInt(idParam, 10);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: "id debe ser un número válido" });
            }
            const item = await this.itemUseCase.obtenerItemPorId(id);
            if (!item) {
                return res.status(404).json({ message: "Item no encontrado" });
            }
            res.status(200).json(item);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener el ítem" });
        }
    }
    async getByMarca(req, res) {
        try {
            const marca = req.params.marca;
            if (!marca) {
                return res.status(400).json({ message: "marca es requerida" });
            }
            const items = await this.itemUseCase.obtenerItemPorMarca(marca);
            res.status(200).json(items);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al obtener los ítems" });
        }
    }
    async create(req, res) {
        try {
            const { nombre, marca, precioCompra, precioVenta, stock, fechaIngreso } = req.body;
            if (!nombre || !marca)
                return res.status(400).json({ message: "nombre y marca son requeridos" });
            const precioC = Number(precioCompra);
            const precioV = Number(precioVenta);
            const stk = Number(stock);
            const fecha = fechaIngreso ? new Date(fechaIngreso) : new Date();
            if (Number.isNaN(precioC) || Number.isNaN(precioV) || Number.isNaN(stk)) {
                return res.status(400).json({ message: "precioCompra, precioVenta y stock deben ser números" });
            }
            const newItem = new Item_js_1.Item(0, nombre, marca, precioC, precioV, stk, fecha);
            await this.itemUseCase.crearItem(newItem);
            res.status(201).json({ message: "Ítem creado correctamente" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al crear el ítem" });
        }
    }
    async delete(req, res) {
        try {
            const idParam = req.params.id;
            if (!idParam) {
                return res.status(400).json({ message: "id es requerido" });
            }
            const id = parseInt(idParam, 10);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: "id debe ser un número válido" });
            }
            await this.itemUseCase.eliminarItem(id);
            res.status(200).json({ message: "Item eliminado correctamente" });
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar el ítem" });
        }
    }
}
exports.ItemController = ItemController;
