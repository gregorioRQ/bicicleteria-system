import { MetodoPago, Tipo } from "./Venta";

export class VentaRequest{
    constructor(
        public cliente_nombre: string,
        public cliente_dni: string,
        public cliente_telefono: string,
        public empleado_id: bigint,
        public metodo_pago: MetodoPago,
        public tipo_venta: Tipo,
        public servicios_ids:number[]
    ){}
}