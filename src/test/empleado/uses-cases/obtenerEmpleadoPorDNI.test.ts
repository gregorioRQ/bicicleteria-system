jest.mock("../../../sales/infrastructure/driven-adapters/MySQLEmpleadoRepository");

import { EmpleadoUseCases } from "../../../sales/application/use-cases/EmpleadoUseCases";
import { EmpleadoRepositoryOutPort } from "../../../sales/domain/repositories/EmpleadoRepositoryOutPort";
import { Empleado, Rol } from "../../../sales/domain/model/Empleado";

describe("Obtener Empleado por DNI Use Case", () => {
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
        } as jest.Mocked<EmpleadoRepositoryOutPort>;
        
        empleadoUseCases = new EmpleadoUseCases(empleadoRepository);
    });

    describe("Happy Path", () => {
        it("Debería retornar un empleado existente por DNI", async () => {
            // PREPARACION
            const dni = "12345678";
            const empleadoExistente: Empleado = {
                id: 1n,
                nombre: "Juan",
                dni: "12345678",
                telefono: "1234567890",
                rol: Rol.MECANICO,
            };

            empleadoRepository.findByDni.mockResolvedValue(empleadoExistente);

            // EJECUCION
            const resultado = await empleadoUseCases.otenerEmpleadoPorDNI(dni);

            // VERIFICACION
            expect(resultado).toEqual(empleadoExistente);
            expect(empleadoRepository.findByDni).toHaveBeenCalledWith(dni);
            expect(empleadoRepository.findByDni).toHaveBeenCalledTimes(1);
        });

        it("Debería retornar null si el empleado no existe", async () => {
            // PREPARACION
            const dni = "99999999";
            empleadoRepository.findByDni.mockResolvedValue(null);

            // EJECUCION
            const resultado = await empleadoUseCases.otenerEmpleadoPorDNI(dni);

            // VERIFICACION
            expect(resultado).toBeNull();
            expect(empleadoRepository.findByDni).toHaveBeenCalledWith(dni);
            expect(empleadoRepository.findByDni).toHaveBeenCalledTimes(1);
            
        });
    });

    describe("Edge Cases - Validación de DNI", () => {
        it("Debería lanzar error si el DNI es null", async () => {
            // EJECUCION Y VERIFICACION
            await expect(empleadoUseCases.otenerEmpleadoPorDNI(null as any)).rejects.toThrow(
                "DNI inválido."
            );
            expect(empleadoRepository.findByDni).not.toHaveBeenCalled();
        });

        it("Debería lanzar error si el DNI es undefined", async () => {
            // EJECUCION Y VERIFICACION
            await expect(empleadoUseCases.otenerEmpleadoPorDNI(undefined as any)).rejects.toThrow(
                "DNI inválido."
            );
            expect(empleadoRepository.findByDni).not.toHaveBeenCalled();
        });

        it("Debería lanzar error si el DNI es una cadena vacía", async () => {
            // EJECUCION Y VERIFICACION
            await expect(empleadoUseCases.otenerEmpleadoPorDNI("")).rejects.toThrow(
                "DNI inválido."
            );
            expect(empleadoRepository.findByDni).not.toHaveBeenCalled();
        });

        it("Debería lanzar error si el DNI tiene solo espacios en blanco", async () => {
            // EJECUCION Y VERIFICACION
            await expect(empleadoUseCases.otenerEmpleadoPorDNI("   ")).rejects.toThrow(
                "DNI inválido."
            );
            expect(empleadoRepository.findByDni).not.toHaveBeenCalled();
        });

    });

    describe("Edge Cases - DNI válido pero con espacios", () => {
        it("Debería obtener empleado si DNI tiene espacios al inicio/final", async () => {
            // PREPARACION
            const dniConEspacios = "  12345678  ";
            const dniLimpio = "12345678";
            const empleadoExistente: Empleado = {
                id: 1n,
                nombre: "Juan",
                dni: dniLimpio,
                telefono: "1234567890",
                rol: Rol.MECANICO,
            };

            empleadoRepository.findByDni.mockResolvedValue(empleadoExistente);

            // EJECUCION
            const resultado = await empleadoUseCases.otenerEmpleadoPorDNI(dniConEspacios);

            // VERIFICACION
            expect(resultado).toEqual(empleadoExistente);
            expect(empleadoRepository.findByDni).toHaveBeenCalledWith(dniLimpio);
        });
    });

    describe("Edge Cases - Error en la base de datos", () => {
        it("Debería lanzar error si hay un problema en la base de datos", async () => {
            // PREPARACION
            const dni = "12345678";
            empleadoRepository.findByDni.mockRejectedValue(
                new Error("Error de conexión a la BD")
            );

            // EJECUCION Y VERIFICACION
            await expect(empleadoUseCases.otenerEmpleadoPorDNI(dni)).rejects.toThrow(
                "Error al obtener el empleado por DNI:"
            );
            expect(empleadoRepository.findByDni).toHaveBeenCalledWith(dni);
        });
    });
});