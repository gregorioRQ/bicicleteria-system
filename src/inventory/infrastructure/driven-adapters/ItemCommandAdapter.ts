import type { ItemCommand } from "../../../maintenance/domain/ports/ItemCommand.js";
import type { IItemRepositoryPort } from "../../domain/repositories/ItemRepositoryOutPort.js";


export class ItemCommanAdapter implements ItemCommand{

    constructor(private readonly itemRepo: IItemRepositoryPort){};

    descontarStock(idStock: number, cantidadDescontar: number): void {
        this.itemRepo.updateStock(idStock, cantidadDescontar);
    }

}