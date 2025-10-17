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
    aumentarStock(cantidad: number) {
    if (cantidad <= 0) throw new Error("La cantidad debe ser mayor a cero");
    this.stock += cantidad;
  }

  reducirStock(cantidad: number) {
    if (cantidad <= 0) throw new Error("La cantidad debe ser mayor a cero");
    if (cantidad > this.stock) throw new Error("Stock insuficiente");
    this.stock -= cantidad;
  }
}