import { ca } from "zod/v4/locales";
import { ItemDTO } from "../../../maintenance/domain/model/ItemDTO";
import type { ItemCommand } from "../../../maintenance/domain/ports/ItemCommand";
import { IItemRepositoryPort } from "../../domain/repositories/ItemRepositoryOutPort";


export class ItemCommanAdapter implements ItemCommand{

    constructor(private readonly itemRepo: IItemRepositoryPort){};

    async descontarStockYobtenerSuPrecioVenta(items: Array<{item_id: number, descontar: number}>): Promise<ItemDTO[]> {
        
        if(!await this.itemRepo.updateStockBatch(items)){
            return [];
        }else{
        const itemsUpdated = await this.itemRepo.updateStockBatch(items);
        return itemsUpdated.map(i => new ItemDTO(i.nombre, i.marca, i.precioVenta));
       }
    }
    }
