import { Servicio } from "./servicio";
import { Usuario } from "./usuario.model"; 


export class Resenia {
    _id!: string;
    valoracion!: string; 
    fechaAlta!: string; 
    imagen!: string; 
    comentario!: string;
    usuario!: Usuario;
    servicio!: Servicio;
}
