import { Empleado } from "../../domain/model/Empleado";
import type { Venta } from "../../domain/model/Venta";
import type { VentaRepositoryOutPort } from "../../domain/repositories/VentaRepositoryOutPort";
import type { EmpleadoRepositoryOutPort } from "../../domain/repositories/EmpleadoRepositoryOutPort";
import { VentaResponse } from "../../domain/model/VentaResponse";
import { IMaintenanceServicePort } from "../../domain/ports/IMaintenanceServicePort";


export class VentaUseCases{
    constructor(
        private readonly ventaRepository: VentaRepositoryOutPort,
        private readonly empleadoRepository: EmpleadoRepositoryOutPort,
        private readonly maintenanceService: IMaintenanceServicePort
    ){};

    async registrarVenta(v: Venta): Promise<VentaResponse>{
        const empleado_id = Number(v.empleado_id);
        const empleado = await this.empleadoRepository.findById(empleado_id);
        if(empleado === null){
            throw new Error("Empleado no encontrado");
        }
        // por el momento solo traera un true o false mas adelante traera mas si el cliente esta asociado a mas de uno
        const service = await this.maintenanceService.getServiceById(Number(v.servicio_id))
        if(service == null){
            throw new Error("Servicio no encontrado")
        }
        const res = await this.ventaRepository.save(v);
        if(res == null){
            throw new Error("No se pudo guardar el servicio")
        }
        const vr = new VentaResponse(
            res.id!,
            res.total,
            res.metodo_pago,
            res.tipo_venta,
            res.cliente_nombre,
            res.cliente_dni,
            service
        );
        return vr;
    }

    async getVenta(id: number): Promise<VentaResponse | null>{
        //usar el serviceCommand aqui para pedir los datos del servicio
        // al  modulo maintenance
        return null;
    }
}