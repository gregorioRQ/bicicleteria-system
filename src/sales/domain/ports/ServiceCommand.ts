export interface ServiceCommand{
    obtenerServicios(id: number): Promise<boolean>;
}