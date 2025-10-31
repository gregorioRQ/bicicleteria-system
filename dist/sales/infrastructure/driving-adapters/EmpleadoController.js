"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoController = void 0;
const Empleado_1 = require("../../domain/model/Empleado");
class EmpleadoController {
    constructor(empleadoUseCase) {
        this.empleadoUseCase = empleadoUseCase;
    }
    ;
    async crearEmpleado(req, res) {
        try {
            const { nombre, dni, telefono, rol } = req.body;
            const nuevoEmpleado = new Empleado_1.Empleado(undefined, nombre, dni, rol, telefono);
            await this.empleadoUseCase.crearEmpleado(nuevoEmpleado);
            return res.status(201).json({ message: "Empleado creado exitosamente" });
        }
        catch (error) {
            return res.status(500).json({ message: "Error al crear el empleado", error });
        }
    }
    async obtenerEmpleados() {
        return this.empleadoUseCase.obtenerEmpleados();
    }
    async obtenerEmpleadoPorId(id) {
        return this.empleadoUseCase.obtenerEmpleadoPorId(id);
    }
}
exports.EmpleadoController = EmpleadoController;
