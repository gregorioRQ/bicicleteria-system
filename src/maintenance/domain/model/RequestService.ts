import { Estado, TipoServicio } from "../model/Service";



export class RequestService {
    constructor(
        public tipo_servicio: TipoServicio,
        public num_bicicleta: number,
        public precio_base: number,
        public precio_total: number,
        public costo_piezas: number,
        public fecha_ingreso: Date | undefined,
        public estado : Estado = Estado.PENDIENTE,
        public empleado_id: bigint,
        public fecha_entrega: Date | undefined,
        public items_reparacion: [{
            item_id: number;
            descontar: number;
        }],
    ) {}
}