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
    mockEmpleadoUseCase = new (EmpleadoUseCases as any)(null);
    empleadoController = new EmpleadoController(mockEmpleadoUseCase);

    responseJson = jest.fn();
    mockResponse = {
      json: responseJson,
      status: jest.fn(),
    };
    responseStatus = jest.spyOn(mockResponse, "status").mockImplementation(() => mockResponse as Response);

    mockRequest = {
      params: {},
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("obtenerEmpleadoPorId", () => {
    // 1. Happy Path: Encuentra el empleado
    it("should return an employee with status 200 when found", async () => {
      // Arrange
      const empleadoId = 1;
      const mockEmpleado = new Empleado(BigInt(empleadoId), "Juan Perez", "12345678", Rol.VENDEDOR, "987654321");
      mockRequest.params = { id: empleadoId.toString() };
      mockEmpleadoUseCase.obtenerEmpleadoPorId.mockResolvedValue(mockEmpleado);

      // Act
      await empleadoController.obtenerEmpleadoPorId(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockEmpleadoUseCase.obtenerEmpleadoPorId).toHaveBeenCalledWith(empleadoId);
      expect(responseStatus).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith(mockEmpleado);
    });

    // 2. Edge Case: Empleado no encontrado
    it("should return status 404 when employee is not found", async () => {
      // Arrange
      const empleadoId = 99;
      mockRequest.params = { id: empleadoId.toString() };
      mockEmpleadoUseCase.obtenerEmpleadoPorId.mockResolvedValue(null);

      // Act
      await empleadoController.obtenerEmpleadoPorId(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(responseStatus).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: "Empleado no encontrado." });
    });

    // 3. Edge Case: ID inválido
    it.each([
        { id: "abc", description: "non-numeric string" },
        { id: "0", description: "zero" },
        { id: "-1", description: "negative number" },
    ])("should return status 400 for invalid ID ($description)", async ({ id }) => {
        // Arrange
        mockRequest.params = { id };

        // Act
        await empleadoController.obtenerEmpleadoPorId(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(responseStatus).toHaveBeenCalledWith(400);
        expect(responseJson).toHaveBeenCalledWith({ message: "ID inválido." });
        expect(mockEmpleadoUseCase.obtenerEmpleadoPorId).not.toHaveBeenCalled();
    });

    // 4. Edge Case: Error del caso de uso
    it("should return status 500 when the use case throws an error", async () => {
        // Arrange
        const empleadoId = 1;
        mockRequest.params = { id: empleadoId.toString() };
        const errorMessage = "Database error";
        mockEmpleadoUseCase.obtenerEmpleadoPorId.mockRejectedValue(new Error(errorMessage));

        // Act
        await empleadoController.obtenerEmpleadoPorId(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(responseStatus).toHaveBeenCalledWith(500);
        expect(responseJson).toHaveBeenCalledWith({ message: "Error al obtener el empleado por ID" });
    });
  });

  describe("obtenerEmpleadoPorDNI", () => {
    // 1. Happy Path: Encuentra el empleado
    it("should return an employee with status 200 when found", async () => {
        // Arrange
        const empleadoDNI = "12345678A";
        const mockEmpleado = new Empleado(1n, "Juan Perez", empleadoDNI, Rol.VENDEDOR, "987654321");
        mockRequest.params = { dni: empleadoDNI };
        mockEmpleadoUseCase.obtenerEmpleadoPorDNI.mockResolvedValue(mockEmpleado);

        // Act
        await empleadoController.obtenerEmpleadoPorDNI(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(mockEmpleadoUseCase.obtenerEmpleadoPorDNI).toHaveBeenCalledWith(empleadoDNI);
        expect(responseStatus).toHaveBeenCalledWith(200);
        expect(responseJson).toHaveBeenCalledWith(mockEmpleado);
    });

    // 2. Edge Case: Empleado no encontrado
    it("should return status 404 when employee is not found", async () => {
        // Arrange
        const empleadoDNI = "00000000X";
        mockRequest.params = { dni: empleadoDNI };
        mockEmpleadoUseCase.obtenerEmpleadoPorDNI.mockResolvedValue(null);

        // Act
        await empleadoController.obtenerEmpleadoPorDNI(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(responseStatus).toHaveBeenCalledWith(404);
        expect(responseJson).toHaveBeenCalledWith({ message: "Empleado no encontrado." });
    });

    // 3. Edge Case: DNI inválido
    it.each([
        { dni: " ", description: "whitespace" },
        { dni: "undefined", description: "string 'undefined'" },
        { dni: "null", description: "string 'null'" },
    ])("should return status 400 for invalid DNI ($description)", async ({ dni }) => {
        // Arrange
        mockRequest.params = { dni };

        // Act
        await empleadoController.obtenerEmpleadoPorDNI(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(responseStatus).toHaveBeenCalledWith(400);
        expect(responseJson).toHaveBeenCalledWith({ message: "DNI inválido." });
        expect(mockEmpleadoUseCase.obtenerEmpleadoPorDNI).not.toHaveBeenCalled();
    });
  });

  describe("obtenerEmpleadoPorDNI", () => {
    // 1. Happy Path: Encuentra el empleado
    it("should return an employee with status 200 when found", async () => {
        // Arrange
        const empleadoDNI = "12345678A";
        const mockEmpleado = new Empleado(1n, "Juan Perez", empleadoDNI, Rol.VENDEDOR, "987654321");
        mockRequest.params = { dni: empleadoDNI };
        mockEmpleadoUseCase.obtenerEmpleadoPorDNI.mockResolvedValue(mockEmpleado);

        // Act
        await empleadoController.obtenerEmpleadoPorDNI(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(mockEmpleadoUseCase.obtenerEmpleadoPorDNI).toHaveBeenCalledWith(empleadoDNI);
        expect(responseStatus).toHaveBeenCalledWith(200);
        expect(responseJson).toHaveBeenCalledWith(mockEmpleado);
    });

    // 2. Edge Case: Empleado no encontrado
    it("should return status 404 when employee is not found", async () => {
        // Arrange
        const empleadoDNI = "00000000X";
        mockRequest.params = { dni: empleadoDNI };
        mockEmpleadoUseCase.obtenerEmpleadoPorDNI.mockResolvedValue(null);

        // Act
        await empleadoController.obtenerEmpleadoPorDNI(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(responseStatus).toHaveBeenCalledWith(404);
        expect(responseJson).toHaveBeenCalledWith({ message: "Empleado no encontrado." });
    });

    // 3. Edge Case: DNI inválido
    it.each([
        { dni: " ", description: "whitespace" },
        { dni: "undefined", description: "string 'undefined'" },
        { dni: "null", description: "string 'null'" },
    ])("should return status 400 for invalid DNI ($description)", async ({ dni }) => {
        // Arrange
        mockRequest.params = { dni };

        // Act
        await empleadoController.obtenerEmpleadoPorDNI(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(responseStatus).toHaveBeenCalledWith(400);
        expect(responseJson).toHaveBeenCalledWith({ message: "DNI inválido." });
        expect(mockEmpleadoUseCase.obtenerEmpleadoPorDNI).not.toHaveBeenCalled();
    });
  });
});
