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
        fecha: Date,
        total: number,
        metodo_pago: MetodoPago,
        tipo: Tipo,
        cliente_id: bigint,
        empleado_id: bigint,
        servicio_id: bigint
    ) {};
}