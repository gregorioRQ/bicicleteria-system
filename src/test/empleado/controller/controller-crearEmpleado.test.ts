import { EmpleadoController } from "../../../sales/infrastructure/driving-adapters/EmpleadoController";
import { EmpleadoUseCases } from "../../../sales/application/use-cases/EmpleadoUseCases";
import { Empleado, Rol } from "../../../sales/domain/model/Empleado";
import { Request, Response } from "express";

// Mock de EmpleadoUseCases
jest.mock("../../../sales/application/use-cases/EmpleadoUseCases");

describe("EmpleadoController", () => {
  let empleadoController: EmpleadoController;
  let mockEmpleadoUseCase: jest.Mocked<EmpleadoUseCases>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseJson: jest.Mock;
  let responseStatus: jest.SpyInstance;

  beforeEach(() => {
    // Crear una nueva instancia mockeada de EmpleadoUseCases antes de cada test
    mockEmpleadoUseCase = new (EmpleadoUseCases as any)(null);
    empleadoController = new EmpleadoController(mockEmpleadoUseCase);

    // Mocks para la respuesta de Express
    responseJson = jest.fn();
    mockResponse = {
      json: responseJson,
      status: jest.fn(), // Añadimos un mock para la propiedad status
    };
    // Usamos spyOn para poder encadenar .json() después de .status()
    responseStatus = jest.spyOn(mockResponse, "status").mockImplementation(() => mockResponse as Response);

    // Mock para la petición de Express
    mockRequest = {};
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("crearEmpleado", () => {
    // 1. Happy Path: El empleado se crea correctamente
    it("should create an employee successfully and return status 201", async () => {
      // Arrange
      mockRequest.body = {
        nombre: "Juan Perez",
        dni: "12345678",
        telefono: "987654321",
        rol: Rol.VENDEDOR,
      };
      const nuevoEmpleado = new Empleado(undefined, "Juan Perez", "12345678", Rol.VENDEDOR, "987654321");
      
      // Mock para que la llamada al use case sea exitosa
      mockEmpleadoUseCase.crearEmpleado.mockResolvedValue(undefined);

      // Act
      await empleadoController.crearEmpleado(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockEmpleadoUseCase.crearEmpleado).toHaveBeenCalledWith(expect.objectContaining(nuevoEmpleado));
      expect(responseStatus).toHaveBeenCalledWith(201);
      expect(responseJson).toHaveBeenCalledWith({ message: "Empleado creado exitosamente" });
    });

    // 2. Edge Case: El use case lanza un error (ej. DNI duplicado)
    it("should return status 500 when the use case throws an error", async () => {
      // Arrange
      mockRequest.body = {
        nombre: "Juan Perez",
        dni: "12345678",
        telefono: "987654321",
        rol: "Vendedor",
      };
      const errorMessage = "El DNI ya está registrado.";
      mockEmpleadoUseCase.crearEmpleado.mockRejectedValue(new Error(errorMessage));

      // Act
      await empleadoController.crearEmpleado(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(responseStatus).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({
        message: "Error al crear el empleado",
        error: errorMessage,
      });
    });

     it("should return status 500 when the use case throws a different error", async () => {
      // Arrange
      mockRequest.body = {
        nombre: "Ana Gomez",
        dni: "87654321",
        telefono: "112233445",
        rol: "Mecánico",
      };
      const errorMessage = "El teléfono ya está registrado.";
      mockEmpleadoUseCase.crearEmpleado.mockRejectedValue(new Error(errorMessage));

      // Act
      await empleadoController.crearEmpleado(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(responseStatus).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({
        message: "Error al crear el empleado",
        error: errorMessage,
      });
    });
  });


  describe("obtenerEmpleados", () => {
    // 1. Happy Path: Devuelve una lista de empleados
    it("should return a list of employees with status 200", async () => {
      // Arrange
      const mockEmpleados = [
        new Empleado(1n, "Juan Perez", "12345678", Rol.VENDEDOR, "987654321"),
        new Empleado(2n, "Ana Gomez", "87654321", Rol.MECANICO, "112233445"),
      ];
      mockEmpleadoUseCase.obtenerEmpleados.mockResolvedValue(mockEmpleados);

      // Act
      await empleadoController.obtenerEmpleados(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockEmpleadoUseCase.obtenerEmpleados).toHaveBeenCalledTimes(1);
      expect(responseStatus).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(mockEmpleados);
    });

    // 2. Happy Path: Devuelve una lista vacía si no hay empleados
    it("should return an empty list with status 200 if no employees exist", async () => {
      // Arrange
      const mockEmpleados: Empleado[] = [];
      mockEmpleadoUseCase.obtenerEmpleados.mockResolvedValue(mockEmpleados);

      // Act
      await empleadoController.obtenerEmpleados(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(responseStatus).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith([]);
    });

    // 3. Edge Case: El use case lanza un error
    it("should return status 500 when the use case throws an error", async () => {
      // Arrange
      const errorMessage = "Error de base de datos";
      mockEmpleadoUseCase.obtenerEmpleados.mockRejectedValue(new Error(errorMessage));

      // Act
      await empleadoController.obtenerEmpleados(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(responseStatus).toHaveBeenCalledWith(500);
      expect(responseJson).toHaveBeenCalledWith({ message: "Error al obtener los empleados" });
    });
  });
});


