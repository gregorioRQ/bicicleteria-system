import type { ItemCommand } from "../../../maintenance/domain/ports/ItemCommand";
import type { IItemRepositoryPort } from "../../domain/repositories/ItemRepositoryOutPort";


export class ItemCommanAdapter implements ItemCommand{

    constructor(private readonly itemRepo: IItemRepositoryPort){};

    descontarStock(idStock: number, cantidadDescontar: number): void {
        this.itemRepo.updateStock(idStock, cantidadDescontar);
    }

}