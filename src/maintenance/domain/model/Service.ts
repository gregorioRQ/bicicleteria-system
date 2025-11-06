import { ItemDTO } from "./ItemDTO";

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
        public descripcion: string | undefined,
        public num_bicicleta: number,
        public precio_base: number,
        public precio_total: number,
        public costo_piezas: number,
        public fecha_ingreso: Date = new Date(),
        public estado : Estado,
        public empleado_id: bigint,
        public fecha_entrega: Date | undefined,
        public items_empleados: Array<ItemDTO>
    ) {}
}