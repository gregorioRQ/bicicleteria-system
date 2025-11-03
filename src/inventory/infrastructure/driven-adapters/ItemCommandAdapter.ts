import type { ItemCommand } from "../../../maintenance/domain/ports/ItemCommand";
import { IItemRepositoryPort } from "../../domain/repositories/ItemRepositoryOutPort";


export class ItemCommanAdapter implements ItemCommand{

    constructor(private readonly itemRepo: IItemRepositoryPort){};

    async descontarStock(items: [{item_id: number, cantidad: number}]): Promise<boolean> {
        for(const {item_id, cantidad} of items){
            if(!await this.itemRepo.decrementarStock(item_id, cantidad)){
                console.error("Ocurrió un error al actualizar el stock");
                return false;
            }
        }
        return true;
    }

}