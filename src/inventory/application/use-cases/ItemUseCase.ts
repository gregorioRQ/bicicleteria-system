import { Item } from "../../domain/model/Item";
import type { IItemRepositoryPort } from "../../domain/repositories/ItemRepositoryOutPort";

/**
 * Puerto de entrada: Define los casos de uso para gestionar productos
 * Esta es una interfaz que será implementada por los servicios de dominio.
 * Define qué operaciones ofrece el dominio al exterior (controladores, API, etc.)
 */
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
      if (!item.nombre.trim()) throw new Error("El nombre del ítem es obligatorio.");
      if (item.precioVenta <= 0) throw new Error("El precio debe ser mayor a 0.");
      if (item.stock < 0) throw new Error("El stock no puede ser negativo.");

      // si el item a crear ya existe solo se incrementa su stock.
      const existing = await this.itemRepository.findByName(item.nombre);
      if (existing) {
        const nuevoStock = existing.stock + item.stock;
        await this.itemRepository.updateStock(existing.id, nuevoStock);
        return; // no guardar un nuevo registro
      }

      await this.itemRepository.save(item);
    }
  
    async actualizarStock(id: number, cantidad: number): Promise<void> {
      const item = await this.itemRepository.findById(id);
      if (!item) throw new Error("El ítem no existe.");
      const nuevoStock = item.stock + cantidad;
      if (nuevoStock < 0) throw new Error("El stock no puede quedar negativo.");
      await this.itemRepository.updateStock(id, nuevoStock);
      if(item.stock < 5) {
        console.warn("El item: " + item.nombre + "se encuentra con stock bajo!");
      }
    }
  
    async eliminarItem(id: number): Promise<void> {
      const item = await this.itemRepository.findById(id);
      if (!item) throw new Error("El ítem no existe o ya fue eliminado.");
      await this.itemRepository.delete(id);
    }
}