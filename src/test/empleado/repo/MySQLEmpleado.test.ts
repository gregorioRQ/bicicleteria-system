import { pool } from "../../../db";
import { MySQLEmpleadoRepository } from "../../../sales/infrastructure/driven-adapters/MySQLEmpleadoRepository";
import { Empleado, Rol } from "../../../sales/domain/model/Empleado";

describe("MySQLEmpleadoRepository", () => {
    let empleadoRepository: MySQLEmpleadoRepository;

    beforeAll(async () => {
        empleadoRepository = new MySQLEmpleadoRepository();
        // Limpiar tabla antes de las pruebas
        await pool.query("DELETE FROM empleados");
    });

    afterEach(async () => {
        // Limpiar datos después de cada test
        await pool.query("DELETE FROM empleados");
    });

    afterAll(async () => {
        // Cerrar conexión
        await pool.end();
    });

    describe("save - Crear Empleado", () => {
        it("Debería guardar un empleado correctamente", async () => {
            // PREPARACION
            const empleado = new Empleado(
                undefined,
                "Juan",
                "12345678",
                Rol.MECANICO,
                "1234567890"
            );

            // EJECUCION
            await empleadoRepository.save(empleado);

            // VERIFICACION
            const empleadoGuardado = await empleadoRepository.findByDni("12345678");
            expect(empleadoGuardado).not.toBeNull();
            expect(empleadoGuardado?.nombre).toBe("Juan");
            expect(empleadoGuardado?.rol).toBe(Rol.MECANICO);
        });
    });

    describe("findByDni - Buscar por DNI", () => {
        it("Debería encontrar un empleado por DNI", async () => {
            // PREPARACION
            const empleado = new Empleado(
                undefined,
                "María",
                "87654321",
                Rol.VENDEDOR,
                "0987654321"
            );
            await empleadoRepository.save(empleado);

            // EJECUCION
            const resultado = await empleadoRepository.findByDni("87654321");

            // VERIFICACION
            expect(resultado).not.toBeNull();
            expect(resultado?.nombre).toBe("María");
            expect(resultado?.dni).toBe("87654321");
        });

        it("Debería retornar null si no encuentra empleado por DNI", async () => {
            // EJECUCION
            const resultado = await empleadoRepository.findByDni("99999999");

            // VERIFICACION
            expect(resultado).toBeNull();
        });
    });

    describe("findById - Buscar por ID", () => {
        it("Debería encontrar un empleado por ID", async () => {
            // PREPARACION
            const empleado = new Empleado(
                undefined,
                "Carlos",
                "11111111",
                Rol.MECANICO,
                "1111111111"
            );
            await empleadoRepository.save(empleado);
            const empleadoGuardado = await empleadoRepository.findByDni("11111111");

            // EJECUCION
            const resultado = await empleadoRepository.findById(Number(empleadoGuardado?.id));

            // VERIFICACION
            expect(resultado).not.toBeNull();
            expect(resultado?.nombre).toBe("Carlos");
        });

        it("Debería retornar null si no encuentra empleado por ID", async () => {
            // EJECUCION
            const resultado = await empleadoRepository.findById(99999);

            // VERIFICACION
            expect(resultado).toBeNull();
        });
    });

    describe("findAll - Obtener todos", () => {
        it("Debería retornar lista de empleados", async () => {
            // PREPARACION
            const empleado1 = new Empleado(undefined, "Ana", "22222222", Rol.MECANICO, "2222222222");
            const empleado2 = new Empleado(undefined, "Luis", "33333333", Rol.VENDEDOR, "3333333333");
            
            await empleadoRepository.save(empleado1);
            await empleadoRepository.save(empleado2);

            // EJECUCION
            const resultado = await empleadoRepository.findAll();

            // VERIFICACION
            expect(resultado).toHaveLength(2);
            expect(resultado[0].nombre).toBe("Ana");
            expect(resultado[1].nombre).toBe("Luis");
        });

        it("Debería retornar lista vacía si no hay empleados", async () => {
            // EJECUCION
            const resultado = await empleadoRepository.findAll();

            // VERIFICACION
            expect(resultado).toHaveLength(0);
            expect(resultado).toEqual([]);
        });
    });

    describe("delete - Eliminar Empleado", () => {
        it("Debería eliminar un empleado correctamente", async () => {
            // PREPARACION
            const empleado = new Empleado(undefined, "Pedro", "44444444", Rol.MECANICO, "4444444444");
            await empleadoRepository.save(empleado);
            const empleadoGuardado = await empleadoRepository.findByDni("44444444");

            // EJECUCION
            const resultado = await empleadoRepository.delete(Number(empleadoGuardado?.id));

            // VERIFICACION
            expect(resultado).toBe(true);
            const empleadoEliminado = await empleadoRepository.findByDni("44444444");
            expect(empleadoEliminado).toBeNull();
        });

        it("Debería retornar false si intenta eliminar ID que no existe", async () => {
            // EJECUCION
            const resultado = await empleadoRepository.delete(99999);

            // VERIFICACION
            expect(resultado).toBe(false);
        });
    });

    describe("findByTelefono - Buscar por teléfono", () => {
        it("Debería encontrar un empleado por teléfono", async () => {
            // PREPARACION
            const empleado = new Empleado(undefined, "Sofia", "55555555", Rol.VENDEDOR, "5555555555");
            await empleadoRepository.save(empleado);

            // EJECUCION
            const resultado = await empleadoRepository.findByTelefono("5555555555");

            // VERIFICACION
            expect(resultado).not.toBeNull();
            expect(resultado?.nombre).toBe("Sofia");
        });

        it("Debería retornar null si no encuentra empleado por teléfono", async () => {
            // EJECUCION
            const resultado = await empleadoRepository.findByTelefono("9999999999");

            // VERIFICACION
            expect(resultado).toBeNull();
        });
    });
});