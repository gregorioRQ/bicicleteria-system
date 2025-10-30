export enum Rol{
    MECANICO = "MECANICO",
    VENDEDOR = "VENDEDOR",
}

export class Empleado {
    constructor(
        public id: bigint | undefined,
        public nombre: string,
        public dni: string,
        public rol: Rol,
        public telefono: string
    ){}
}