import { Item } from "../../domain/model/Item";
import type { IItemRepositoryPort } from "../../domain/repositories/ItemRepositoryOutPort";

export class IItemUseCase {
  constructor(private readonly itemRepository: IItemRepositoryPort) {}
  
    async listarItems(): Promise<Item[]> {
      return this.itemRepository.findAll();
    }
  
    async obtenerItemPorId(id: number): Promise<Item | null> {
      return this.itemRepository.findById(id);
    }

    async obtenerItemPorMarca(marca: string): Promise<Item[]>{
      return this.itemRepository.findByMarca(marca);
    }
  
    async crearItem(item: Item): Promise<void> {
      
      // si el item a crear ya existe solo se incrementa su stock.
      const existing = await this.itemRepository.findByName(item.nombre);
      if (existing) {
        const nuevoStock = existing.stock + item.stock;
        await this.itemRepository.updateStock(existing.id, nuevoStock);
        return; // no guardar un nuevo registro
      }
      item.fechaIngreso = new Date();
      await this.itemRepository.save(item);
    }
  
    async actualizarStock(id: number, cantidad: number): Promise<void> {
      const item = await this.itemRepository.findById(id);
      if (!item) throw new Error("El ítem no existe.");
      const nuevoStock = item.stock + cantidad;
      if (nuevoStock < 0) throw new Error("El stock no puede quedar negativo.");
      if(!await this.itemRepository.updateStock(id, nuevoStock)){
        throw new Error("No se pudo descontar el stock");
      }
    }

  
    async eliminarItem(id: number): Promise<void> {
      const item = await this.itemRepository.findById(id);
      if (!item) throw new Error("El ítem no existe o ya fue eliminado.");
      await this.itemRepository.delete(id);
    }
}