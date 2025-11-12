export class Item{
    constructor(
        public id: number,
        public nombre: string,
        public marca: string,
        public precioCompra: number,
        public precioVenta: number,
        public stock: number,
        public fechaIngreso: Date = new Date(),
    ){}
}