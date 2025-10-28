export class Cliente {
    constructor(
        public id: bigint | undefined,
        public nombre: string,
        public dni: string,
        public telefono: string
    ){}
}