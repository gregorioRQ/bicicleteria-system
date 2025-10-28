"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCommanAdapter = void 0;
class ItemCommanAdapter {
    constructor(itemRepo) {
        this.itemRepo = itemRepo;
    }
    ;
    descontarStock(idStock, cantidadDescontar) {
        this.itemRepo.updateStock(idStock, cantidadDescontar);
    }
}
exports.ItemCommanAdapter = ItemCommanAdapter;
