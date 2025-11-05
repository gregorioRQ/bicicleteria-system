

export class ServiceResponse{
    constructor(
        public tipo_servicio: string,
        public descripcion: string | undefined,
        public num_bicicleta: number,
        public precio_base: number,
        public coste_total_piezas: number,
        public precio_total: number,
        public items_reparacion: Array<{nombre: string, marca: string, precioVenta: number}>,
        public estado: string,
        public empleado_id: bigint,
        public fecha_entrega: Date | undefined
    ){}
}