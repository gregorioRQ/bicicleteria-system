export enum MetodoPago {
    EFECTIVO = "EFECTIVO",
    TARJETA = "TARJETA",
    TRANSFERENCIA = "TRANSFERENCIA"
}

export enum Tipo {
    SERVICIO = "SERVICIO",
    PRODUCTO = "PRODUCTO"
}

export class Venta {
    constructor(
        public fecha: Date,
        public total: number,
        public metodo_pago: MetodoPago,
        public tipo: Tipo,
        public cliente_id: bigint,
        public empleado_id: bigint,
        public servicio_id: bigint
    ) {};
}