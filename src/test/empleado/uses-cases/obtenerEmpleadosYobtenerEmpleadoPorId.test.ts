jest.mock("../../../sales/infrastructure/driven-adapters/MySQLEmpleadoRepository");

import { EmpleadoUseCases } from "../../../sales/application/use-cases/EmpleadoUseCases";
import { EmpleadoRepositoryOutPort } from "../../../sales/domain/repositories/EmpleadoRepositoryOutPort";
import { Empleado, Rol } from "../../../sales/domain/model/Empleado";

describe("Obtener Empleados Use Case", () => {
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
        it("Debería retornar lista de empleados cuando existen", async () => {
            // PREPARACION
            const empleados: Empleado[] = [
                {
                    id: 1n,
                    nombre: "Juan",
                    dni: "12345678",
                    telefono: "1234567890",
                    rol: Rol.MECANICO,
                },
                {
                    id: 2n,
                    nombre: "María",
                    dni: "87654321",
                    telefono: "0987654321",
                    rol: Rol.VENDEDOR,
                },
            ];

            empleadoRepository.findAll.mockResolvedValue(empleados);

            // EJECUCION
            const resultado = await empleadoUseCases.obtenerEmpleados();

            // VERIFICACION
            expect(resultado).toEqual(empleados);
            expect(resultado).toHaveLength(2);
            expect(empleadoRepository.findAll).toHaveBeenCalledTimes(1);
        });

        it("Debería retornar lista vacía cuando no hay empleados", async () => {
            // PREPARACION
            empleadoRepository.findAll.mockResolvedValue([]);

            // EJECUCION
            const resultado = await empleadoUseCases.obtenerEmpleados();

            // VERIFICACION
            expect(resultado).toEqual([]);
            expect(resultado).toHaveLength(0);
            expect(empleadoRepository.findAll).toHaveBeenCalledTimes(1);
        });
    });

    describe("Edge Cases - Error en la base de datos", () => {
        it("Debería lanzar error si hay un problema en la base de datos", async () => {
            // PREPARACION
            empleadoRepository.findAll.mockRejectedValue(
                new Error("Error de conexión a la BD")
            );

            // EJECUCION Y VERIFICACION
            await expect(empleadoUseCases.obtenerEmpleados()).rejects.toThrow();
            expect(empleadoRepository.findAll).toHaveBeenCalledTimes(1);
        });
    });
});


describe("Obtener Empleado por ID Use Case", () => {
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
        it("Debería retornar un empleado existente por ID", async () => {
            // PREPARACION
            const empleadoId = 1;
            const empleadoExistente: Empleado = {
                id: 1n,
                nombre: "Juan",
                dni: "12345678",
                telefono: "1234567890",
                rol: Rol.MECANICO,
            };

            empleadoRepository.findById.mockResolvedValue(empleadoExistente);

            // EJECUCION
            const resultado = await empleadoUseCases.obtenerEmpleadoPorId(empleadoId);

            // VERIFICACION
            expect(resultado).toEqual(empleadoExistente);
            expect(empleadoRepository.findById).toHaveBeenCalledWith(empleadoId);
            expect(empleadoRepository.findById).toHaveBeenCalledTimes(1);
        });

        it("Debería retornar null si el empleado no existe", async () => {
            // PREPARACION
            const empleadoId = 999;
            empleadoRepository.findById.mockResolvedValue(null);

            // EJECUCION
            const resultado = await empleadoUseCases.obtenerEmpleadoPorId(empleadoId);

            // VERIFICACION
            expect(resultado).toBeNull();
            expect(empleadoRepository.findById).toHaveBeenCalledWith(empleadoId);
            expect(empleadoRepository.findById).toHaveBeenCalledTimes(1);
        });
    });

    describe("Edge Cases - Validación de ID", () => {
        it("Debería retornar null si el ID es 0", async () => {
            // PREPARACION
            const empleadoId = 0;
            empleadoRepository.findById.mockResolvedValue(null);

            // EJECUCION
            const resultado = await empleadoUseCases.obtenerEmpleadoPorId(empleadoId);

            // VERIFICACION
            expect(resultado).toBeNull();
            expect(empleadoRepository.findById).toHaveBeenCalledWith(empleadoId);
        });

        it("Debería retornar null si el ID es negativo", async () => {
            // PREPARACION
            const empleadoId = -5;
            empleadoRepository.findById.mockResolvedValue(null);

            // EJECUCION
            const resultado = await empleadoUseCases.obtenerEmpleadoPorId(empleadoId);

            // VERIFICACION
            expect(resultado).toBeNull();
            expect(empleadoRepository.findById).toHaveBeenCalledWith(empleadoId);
        });
    });

    describe("Edge Cases - Error en la base de datos", () => {
        it("Debería lanzar error si hay un problema en la base de datos", async () => {
            // PREPARACION
            const empleadoId = 1;
            empleadoRepository.findById.mockRejectedValue(
                new Error("Error de conexión a la BD")
            );

            // EJECUCION Y VERIFICACION
            await expect(empleadoUseCases.obtenerEmpleadoPorId(empleadoId)).rejects.toThrow();
            expect(empleadoRepository.findById).toHaveBeenCalledWith(empleadoId);
        });
    });
});