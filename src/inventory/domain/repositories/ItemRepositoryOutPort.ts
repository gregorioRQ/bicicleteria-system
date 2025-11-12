import { Item } from "../model/Item";

export interface IItemRepositoryPort {
  findAll(): Promise<Item[]>;
  findById(id: number): Promise<Item | null>;
  findByMarca(marca: string): Promise<Item[]>;
  save(item: Item): Promise<void>;
  updateStock(id: number, newStock: number): Promise<boolean>;
  delete(id: number): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;
  findByName(name: string): Promise<Item | null>;
  updateStockBatch(items: Array<{item_id: number, descontar: number}>): Promise<Item[]>;
}