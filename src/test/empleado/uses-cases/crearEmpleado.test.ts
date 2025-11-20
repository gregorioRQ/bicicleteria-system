jest.mock("../../../sales/infrastructure/driven-adapters/MySQLEmpleadoRepository");

import { EmpleadoUseCases } from "../../../sales/application/use-cases/EmpleadoUseCases";
import { EmpleadoRepositoryOutPort } from "../../../sales/domain/repositories/EmpleadoRepositoryOutPort";
import { Empleado, Rol } from "../../../sales/domain/model/Empleado";

describe("Crear Empleado Use Case", () => {
    let empleadoUseCases: EmpleadoUseCases;
    let empleadoRepository: jest.Mocked<EmpleadoRepositoryOutPort>;

    beforeEach(() => {
        jest.clearAllMocks();
        // Se añade findByTelefono al mock para las nuevas validaciones
        empleadoRepository = {
            save: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByDni: jest.fn(),
            findByTelefono: jest.fn(), // Mock del nuevo método
            delete: jest.fn(),
        } as jest.Mocked<EmpleadoRepositoryOutPort>;
        
        empleadoUseCases = new EmpleadoUseCases(empleadoRepository);
    });

    describe("Happy Path", () => {
        it("Debería crear un empleado correctamente si los datos son válidos y no existe previamente", async () => {
            // PREPARACION
            const nuevoEmpleado: Empleado = {
                nombre: "Bobi",
                dni: "45123698",
                telefono: "857412658720",
                rol: Rol.VENDEDOR,
            } as Empleado;

            empleadoRepository.findByDni.mockResolvedValue(null);
            empleadoRepository.findByTelefono.mockResolvedValue(null);

            // EJECUCION
            await empleadoUseCases.crearEmpleado(nuevoEmpleado);

            // VERIFICACION
            expect(empleadoRepository.findByDni).toHaveBeenCalledWith(nuevoEmpleado.dni);
            expect(empleadoRepository.findByTelefono).toHaveBeenCalledWith(nuevoEmpleado.telefono);
            expect(empleadoRepository.save).toHaveBeenCalledWith(nuevoEmpleado);
            expect(empleadoRepository.save).toHaveBeenCalledTimes(1);
        });
    });

    describe("Edge Cases - Validación de Datos", () => {
        it("Debería lanzar un error si los datos del empleado son nulos", async () => {
            // EJECUCION Y VERIFICACION
            await expect(empleadoUseCases.crearEmpleado(null as any)).rejects.toThrow(
                "Datos del empleado requeridos."
            );
            expect(empleadoRepository.save).not.toHaveBeenCalled();
        });

        it("Debería lanzar un error si el DNI ya está registrado", async () => {
            // PREPARACION
            const empleadoExistente: Empleado = {
                id: 1n,
                nombre: "Juan",
                dni: "12345678",
                telefono: "1234567890",
                rol: Rol.MECANICO,
            };
            const nuevoEmpleado: Empleado = {
                nombre: "Pedro",
                dni: "12345678", // DNI duplicado
                telefono: "0987654321",
                rol: Rol.VENDEDOR,
            } as Empleado;

            empleadoRepository.findByDni.mockResolvedValue(empleadoExistente);

            // EJECUCION Y VERIFICACION
            await expect(empleadoUseCases.crearEmpleado(nuevoEmpleado)).rejects.toThrow(
                "El DNI ya está registrado."
            );
            expect(empleadoRepository.findByDni).toHaveBeenCalledWith(nuevoEmpleado.dni);
            expect(empleadoRepository.save).not.toHaveBeenCalled();
        });

        it("Debería lanzar un error si el teléfono ya está registrado", async () => {
            // PREPARACION
            const empleadoExistente: Empleado = {
                id: 2n,
                nombre: "Ana",
                dni: "11112222",
                telefono: "9876543210",
                rol: Rol.MECANICO,
            };
            const nuevoEmpleado: Empleado = {
                nombre: "Luisa",
                dni: "33334444",
                telefono: "9876543210", // Teléfono duplicado
                rol: Rol.VENDEDOR,
            } as Empleado;

            empleadoRepository.findByDni.mockResolvedValue(null); // El DNI no existe
            empleadoRepository.findByTelefono.mockResolvedValue(empleadoExistente); // Pero el teléfono sí

            // EJECUCION Y VERIFICACION
            await expect(empleadoUseCases.crearEmpleado(nuevoEmpleado)).rejects.toThrow(
                "El teléfono ya está registrado."
            );
            expect(empleadoRepository.findByDni).toHaveBeenCalledWith(nuevoEmpleado.dni);
            expect(empleadoRepository.findByTelefono).toHaveBeenCalledWith(nuevoEmpleado.telefono);
            expect(empleadoRepository.save).not.toHaveBeenCalled();
        });
    });
});
