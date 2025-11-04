import { ItemDTO } from "../model/ItemDTO";

export interface ItemCommand{
    
    descontarStockYobtenerSuPrecioVenta(items: Array<{item_id: number, descontar: number}>): Promise<ItemDTO[]>;
}