

export class ItemDTO {
    constructor(
        public nombre: string,
        public marca: string,
        public precioVenta: number,
        public cantidad: number,
        public coste_final: number,
    ) {}
}
