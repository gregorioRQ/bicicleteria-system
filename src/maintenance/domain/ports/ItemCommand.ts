export interface ItemCommand{
    // array de objetos [itemId, cantidad]
    descontarStock(items: [{item_id: number, cantidad: number}]): Promise<boolean>;
}