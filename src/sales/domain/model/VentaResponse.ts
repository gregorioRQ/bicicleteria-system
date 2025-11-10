import { ServiceInfoForSale } from "./ServiceInfoForSale";
import { MetodoPago, Tipo } from "./Venta";

export class VentaResponse{
    constructor(
        public id: bigint,
        public total: number,
        public metodo_pago: MetodoPago,
        public tipo_venta: Tipo,
        public cliente_nombre: string,
        public cliente_dni: string,
        public service: ServiceInfoForSale
    ){};
}