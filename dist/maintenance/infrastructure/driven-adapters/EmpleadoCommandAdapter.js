"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpleadoCommandAdapter = void 0;
class EmpleadoCommandAdapter {
    constructor(empleadoRepo) {
        this.empleadoRepo = empleadoRepo;
    }
    ;
    async existeEmpleado(id) {
        // retorna true si el empleado existe, false si no
        try {
            const empleado = await this.empleadoRepo.findById(id);
            return empleado !== null;
        }
        catch (error) {
            console.error("Error al verificar existencia del empleado:", error);
            return false;
        }
    }
}
exports.EmpleadoCommandAdapter = EmpleadoCommandAdapter;
