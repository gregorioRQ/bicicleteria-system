import { Item } from "../model/Item.js";

/**
 * Puerto de salida: Define las operaciones de persistencia
 * Esta interfaz será implementada por adaptadores de infraestructura.
 * Define qué necesita el dominio del mundo exterior (sin saber cómo se implementa).
 * el dominio la usa para trabajar con el exterior.
 */
export interface IItemRepositoryPort {
  findAll(): Promise<Item[]>;
  findById(id: number): Promise<Item | null>;
  findByMarca(marca: string): Promise<Item[]>;
  save(item: Item): Promise<void>;
  updateStock(id: number, newStock: number): Promise<void>;
  delete(id: number): Promise<boolean>;
  existsByName(name: string): Promise<boolean>;
  findByName(name: string): Promise<Item | null>;
}