"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaController = void 0;
const Venta_1 = require("../../domain/model/Venta");
class VentaController {
    constructor(ventaUseCase) {
        this.ventaUseCase = ventaUseCase;
    }
    ;
    async crearVenta(req, res) {
        try {
            const { total, metodo_pago, tipo_venta, empleado_id, servicio_id, cliente_nombre, cliente_telefono, cliente_dni } = req.body;
            const nuevaVenta = new Venta_1.Venta(undefined, undefined, total, metodo_pago, tipo_venta, empleado_id, servicio_id, cliente_nombre, cliente_telefono, cliente_dni);
            await this.ventaUseCase.registrarVenta(nuevaVenta);
            return res.status(201).json({ message: "Venta registrada exitosamente" });
        }
        catch (error) {
            return res.status(500).json({ message: "Error al registrar la venta" });
        }
    }
}
exports.VentaController = VentaController;
