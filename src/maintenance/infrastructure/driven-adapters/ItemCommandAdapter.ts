
import { ItemDTO } from "../../domain/model/ItemDTO";
import type { ItemCommand } from "../../domain/ports/ItemCommand";
import { IItemRepositoryPort } from "../../../inventory/domain/repositories/ItemRepositoryOutPort";


export class ItemCommanAdapter implements ItemCommand{

    constructor(private readonly itemRepo: IItemRepositoryPort){};

    async descontarStockYobtenerSuPrecioVenta(items: Array<{item_id: number, descontar: number}>): Promise<ItemDTO[]> {
        
        const itemsUpdated = await this.itemRepo.updateStockBatch(items);
        if(itemsUpdated.length == 0){
            return [];
        }else{
            for(const item of itemsUpdated){
                if(item.stock < 5){
                    console.warn("El item: " + item.nombre + " se encuentra con stock bajo!");
                }
            };
        return itemsUpdated.map(i => {
            return new ItemDTO(i.nombre, i.marca, i.precioVenta, items.find(it => it.item_id === i.id)?.descontar || 0, i.precioVenta * (items.find(it => it.item_id === i.id)?.descontar || 0));
        });
       }
    }
    }
