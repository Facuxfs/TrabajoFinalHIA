import { Gestor } from "./gestor";
import { Resenia } from "./resenia";
import { Reserva } from "./reserva";

export class Servicio {
    _id!: string;
    nombre!: string;
    categoria!: string;
    ubicacion!: string;
    calificacionTotal!: number;
    gestor!:string
    resenia!:Array<Resenia>; 
    reservas!:Array<Reserva>; 
    //gestor!: Gestor;

    constructor() {

    }
}

