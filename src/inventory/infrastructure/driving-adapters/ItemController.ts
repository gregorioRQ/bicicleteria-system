import type { Request, Response } from "express";
import type { IItemUseCase } from "../../application/use-cases/ItemUseCase";
import { Item } from "../../domain/model/Item";
import { start } from "repl";

export class ItemController {
  constructor(private itemUseCase: IItemUseCase) {}

  async getAll(req: Request, res: Response) {
    try {
      const items = await this.itemUseCase.listarItems();
      res.status(200).json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los ítems" });
    }
  }

  async getById(req: Request, res: Response) {
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
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el ítem", error: (error as Error).message });
    }
  }

  async getByMarca(req: Request, res:Response){
    try {
      const marca = req.params.marca;
      if(!marca){
        return res.status(400).json({message: "marca es requerida"})
      }
      const items = await this.itemUseCase.obtenerItemPorMarca(marca);
      res.status(200).json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener los ítems", error: (error as Error).message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { nombre, marca, precioCompra, precioVenta, stock, fechaIngreso } = req.body;

      if (!nombre || !marca) return res.status(400).json({ message: "nombre y marca son requeridos" });

      const precioC = Number(precioCompra);
      const precioV = Number(precioVenta);
      const stk = Number(stock);
      const fecha = fechaIngreso ? new Date(fechaIngreso) : new Date();

      if (Number.isNaN(precioC) || Number.isNaN(precioV) || Number.isNaN(stk)) {
        return res.status(400).json({ message: "precioCompra, precioVenta y stock deben ser números" });
      }

      const newItem = new Item(0, nombre, marca, precioC, precioV, stk, fecha);
      await this.itemUseCase.crearItem(newItem);

      res.status(201).json({ message: "Ítem creado correctamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear el ítem", error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response) {
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
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el ítem", 
        error: (error as Error).message
       });
    }
  }

  async aumentarStock(req: Request, res: Response){
    try{

      if(!req.body){
        return res.status(400).json({message: "Cuerpo de la solicitud es requerido"});
      }
      const { id, cantidad } = req.body;

      await this.itemUseCase.actualizarStock(id, cantidad);
      res.status(200).json({ message: "Stock actualizado correctamente" });
    }catch(err){
      console.error(err);
      res.status(500).json({message: "Ocurrió un error al actualizar el ítem",
        error: (err as Error).message
      });
    }
  }

}
