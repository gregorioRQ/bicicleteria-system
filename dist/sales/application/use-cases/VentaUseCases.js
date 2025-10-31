"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaUseCases = void 0;
class VentaUseCases {
    constructor(ventaRepository, empleadoRepository) {
        this.ventaRepository = ventaRepository;
        this.empleadoRepository = empleadoRepository;
    }
    ;
    async registrarVenta(v) {
        const empleado_id = Number(v.empleado_id);
        const empleado = await this.empleadoRepository.findById(empleado_id);
        if (empleado === null) {
            throw new Error("Empleado no encontrado");
        }
        await this.ventaRepository.save(v);
    }
}
exports.VentaUseCases = VentaUseCases;
