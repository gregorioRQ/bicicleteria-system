

export class ServiceResponse{
    constructor(
        public tipo_servicio: string,
        public descripcion: string,
        public num_bicicleta: string,
        public precio_base: number,
        public precio_total: number,
        public items_reparacion: Array<{nombre: string, marca: string, precio_venta: number}>,
        public estado: string,
        public empleado_id: bigint,
        public fecha_entrega: Date | undefined,
        public coste_total_piezas: number
    ){}
}