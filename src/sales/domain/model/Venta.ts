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
        public id: bigint | undefined,
        public fecha: Date,
        public total: number,
        public metodo_pago: MetodoPago,
        public tipo_venta: Tipo,
        public empleado_id: bigint,
        public cliente_nombre: string,
        public cliente_telefono: string,
        public cliente_dni: string,
        public servicios_ids: number[]
    ) {};
}