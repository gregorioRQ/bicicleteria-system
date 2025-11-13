"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCommanAdapter = void 0;
const ItemDTO_1 = require("../../domain/model/ItemDTO");
class ItemCommanAdapter {
    constructor(itemRepo) {
        this.itemRepo = itemRepo;
    }
    ;
    async descontarStockYobtenerSuPrecioVenta(items) {
        const itemsUpdated = await this.itemRepo.updateStockBatch(items);
        if (itemsUpdated.length == 0) {
            return [];
        }
        else {
            for (const item of itemsUpdated) {
                if (item.stock < 5) {
                    console.warn("El item: " + item.nombre + " se encuentra con stock bajo!");
                }
            }
            ;
            return itemsUpdated.map(i => {
                return new ItemDTO_1.ItemDTO(i.nombre, i.marca, i.precioVenta, items.find(it => it.item_id === i.id)?.descontar || 0, i.precioVenta * (items.find(it => it.item_id === i.id)?.descontar || 0));
            });
        }
    }
}
exports.ItemCommanAdapter = ItemCommanAdapter;
