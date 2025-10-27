export enum TipoServicio {
    REPARACION = "REPARACION",
    CHEQUEO = "CHEQUEO"
}

export enum Estado{
    PENDIENTE ='PENDIENTE',
    EN_PROCESO = 'EN_PROCESO',
    FINALIZADO = 'FINALIZADO',
    ENTREGADO = 'ENTREGADO'
}

export class Service {
    constructor(
        public id: number | undefined,
        public tipo_servicio: TipoServicio,
        public descripcion: string,
        public num_cliente: bigint,
        public num_bicicleta: string,
        public precio_base: number,
        public precio_total: number,
        public costo_piezas: number,
        public fecha_ingreso: Date = new Date(),
        public estado : Estado,
        public mecanico_id: bigint,
        public fecha_entrega: Date
    ) {}
}