import { EmpleadoController } from "../../../sales/infrastructure/driving-adapters/EmpleadoController";
import { EmpleadoUseCases } from "../../../sales/application/use-cases/EmpleadoUseCases";
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

  describe("eliminarEmpleado", () => {
    // 1. Happy Path: El empleado se elimina correctamente
    it("should return status 200 when an employee is deleted successfully", async () => {
      // Arrange
      const empleadoId = 1;
      mockRequest.params = { id: empleadoId.toString() };
      mockEmpleadoUseCase.eliminarEmpleado.mockResolvedValue(true);

      // Act
      await empleadoController.eliminarEmpleado(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockEmpleadoUseCase.eliminarEmpleado).toHaveBeenCalledWith(empleadoId);
      expect(responseStatus).toHaveBeenCalledWith(200);
      expect(responseJson).toHaveBeenCalledWith({ message: "Empleado eliminado exitosamente" });
    });

    // 2. Edge Case: Empleado no encontrado para eliminar
    it("should return status 404 when the employee to delete is not found", async () => {
      // Arrange
      const empleadoId = 99;
      mockRequest.params = { id: empleadoId.toString() };
      mockEmpleadoUseCase.eliminarEmpleado.mockResolvedValue(false);

      // Act
      await empleadoController.eliminarEmpleado(mockRequest as Request, mockResponse as Response);

      // Assert
      expect(mockEmpleadoUseCase.eliminarEmpleado).toHaveBeenCalledWith(empleadoId);
      expect(responseStatus).toHaveBeenCalledWith(404);
      expect(responseJson).toHaveBeenCalledWith({ message: "Empleado no encontrado" });
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
        await empleadoController.eliminarEmpleado(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(responseStatus).toHaveBeenCalledWith(400);
        expect(responseJson).toHaveBeenCalledWith({ message: "ID inválido." });
        expect(mockEmpleadoUseCase.eliminarEmpleado).not.toHaveBeenCalled();
    });

    // 4. Edge Case: Error del caso de uso
    it("should return status 500 when the use case throws an error", async () => {
        // Arrange
        const empleadoId = 1;
        mockRequest.params = { id: empleadoId.toString() };
        const errorMessage = "Database connection lost";
        mockEmpleadoUseCase.eliminarEmpleado.mockRejectedValue(new Error(errorMessage));

        // Act
        await empleadoController.eliminarEmpleado(mockRequest as Request, mockResponse as Response);

        // Assert
        expect(responseStatus).toHaveBeenCalledWith(500);
        expect(responseJson).toHaveBeenCalledWith({ message: "Error al eliminar el empleado" });
    });
  });
});
