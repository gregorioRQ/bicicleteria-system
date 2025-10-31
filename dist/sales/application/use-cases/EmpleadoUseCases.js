"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoUseCases = void 0;
class EmpleadoUseCases {
    constructor(empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }
    async crearEmpleado(empleado) {
        if (!empleado) {
            throw new Error("Datos del empleado requeridos.");
        }
        const empleadoExistente = await this.empleadoRepository.findByDni(empleado.dni);
        if (empleadoExistente?.dni === empleado.dni) {
            throw new Error("El DNI ya está registrado.");
        }
        if (empleadoExistente?.telefono === empleado.telefono) {
            throw new Error("El teléfono ya está registrado.");
        }
        await this.empleadoRepository.save(empleado);
    }
    async obtenerEmpleados() {
        return this.empleadoRepository.findAll();
    }
    async obtenerEmpleadoPorId(id) {
        return this.empleadoRepository.findById(id);
    }
    async eliminarEmpleado(id) {
        return this.empleadoRepository.delete(id);
    }
}
exports.EmpleadoUseCases = EmpleadoUseCases;
