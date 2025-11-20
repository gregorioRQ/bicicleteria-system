jest.mock("../../../sales/infrastructure/driven-adapters/MySQLEmpleadoRepository");
import { EmpleadoUseCases } from "../../../sales/application/use-cases/EmpleadoUseCases";
import { EmpleadoRepositoryOutPort } from "../../../sales/domain/repositories/EmpleadoRepositoryOutPort";
import { Empleado, Rol } from "../../../sales/domain/model/Empleado";

describe("Eliminar Empleado Use Case", () => {
    let empleadoUseCases: EmpleadoUseCases;
    let empleadoRepository: jest.Mocked<EmpleadoRepositoryOutPort>;

    beforeEach(() => {
        jest.clearAllMocks();
        empleadoRepository = {
            save: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByDni: jest.fn(),
            delete: jest.fn(),
            findByTelefono: jest.fn(),
        } as jest.Mocked<EmpleadoRepositoryOutPort>;
        
        empleadoUseCases = new EmpleadoUseCases(empleadoRepository);
    });

    describe("Happy Path", () => {
        it("Debería eliminar un empleado existente correctamente", async () => {
            // PREPARACION
            const empleadoId = 2n;
            const empleadoExistente: Empleado = {
                id: empleadoId,
                nombre: "Juan",
                dni: "12345678",
                telefono: "1234567890",
                email: "juan@example.com",
                rol: Rol.MECANICO,
            } as Empleado;

            empleadoRepository.findById.mockResolvedValue(empleadoExistente);
            empleadoRepository.delete.mockResolvedValue(true);

            // EJECUCION
            const resultado = await empleadoUseCases.eliminarEmpleado(empleadoId);

            // VERIFICACION
            expect(resultado).toBe(true);
            expect(empleadoRepository.findById).toHaveBeenCalledWith(empleadoId);
            expect(empleadoRepository.delete).toHaveBeenCalledWith(empleadoId);
            expect(empleadoRepository.findById).toHaveBeenCalledTimes(1);
            expect(empleadoRepository.delete).toHaveBeenCalledTimes(1);
        });
    });

    describe("Edge Cases - Validación de ID", () => {
        it("Debería lanzar error si el ID es null", async () => {
            // EJECUCION Y VERIFICACION
            await expect(empleadoUseCases.eliminarEmpleado(null as any)).rejects.toThrow(
                "ID inválido."
            );
            expect(empleadoRepository.findById).not.toHaveBeenCalled();
            expect(empleadoRepository.delete).not.toHaveBeenCalled();
        });

        it("Debería lanzar error si el ID es 0", async () => {
            // EJECUCION Y VERIFICACION
            await expect(empleadoUseCases.eliminarEmpleado(0)).rejects.toThrow(
                "ID inválido."
            );
            expect(empleadoRepository.findById).not.toHaveBeenCalled();
            expect(empleadoRepository.delete).not.toHaveBeenCalled();
        });

        it("Debería lanzar error si el ID es negativo", async () => {
            // EJECUCION Y VERIFICACION
            await expect(empleadoUseCases.eliminarEmpleado(-5)).rejects.toThrow(
                "ID inválido."
            );
            expect(empleadoRepository.findById).not.toHaveBeenCalled();
            expect(empleadoRepository.delete).not.toHaveBeenCalled();
        });
    });

    describe("Edge Cases - Empleado no encontrado", () => {
        it("Debería lanzar error si el empleado no existe", async () => {
            // PREPARACION
            const empleadoId = 999;
            empleadoRepository.findById.mockResolvedValue(null);

            // EJECUCION Y VERIFICACION
            await expect(empleadoUseCases.eliminarEmpleado(empleadoId)).rejects.toThrow(
                "Empleado no encontrado."
            );
            expect(empleadoRepository.findById).toHaveBeenCalledWith(empleadoId);
            expect(empleadoRepository.delete).not.toHaveBeenCalled();
        });
    });

    describe("Edge Cases - Error en la base de datos", () => {
        it("Debería lanzar error si la eliminación falla", async () => {
            // PREPARACION
            const empleadoId = 1n as bigint;
            const empleadoExistente: Empleado = {
                id: empleadoId,
                nombre: "Juan",
                dni: "12345678",
                telefono: "1234567890",
                email: "juan@example.com",
                rol: Rol.MECANICO,
            } as Empleado;

            empleadoRepository.findById.mockResolvedValue(empleadoExistente);
            empleadoRepository.delete.mockResolvedValue(false);

            // EJECUCION Y VERIFICACION
            const resultado = await empleadoUseCases.eliminarEmpleado(Number(empleadoId));
            expect(resultado).toBe(false);
        });
    });
});