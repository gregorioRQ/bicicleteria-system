"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaController = void 0;
const VentaRequest_1 = require("../../domain/model/VentaRequest");
class VentaController {
    constructor(ventaUseCase) {
        this.ventaUseCase = ventaUseCase;
    }
    ;
    async crearVenta(req, res) {
        try {
            const { metodo_pago, tipo_venta, empleado_id, cliente_nombre, cliente_telefono, cliente_dni, servicios_ids } = req.body;
            const nuevaVenta = new VentaRequest_1.VentaRequest(cliente_nombre, cliente_dni, cliente_telefono, empleado_id, metodo_pago, tipo_venta, servicios_ids);
            const result = await this.ventaUseCase.registrarVenta(nuevaVenta);
            return res.status(201).json({ message: "Venta registrada exitosamente", result });
        }
        catch (error) {
            return res.status(500).json({ message: "Error al registrar la venta", error: error.message });
        }
    }
    async eliminarVenta(req, res) {
        try {
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ message: "Error al eliminar la venta", error: e.message });
            throw e;
        }
    }
}
exports.VentaController = VentaController;
