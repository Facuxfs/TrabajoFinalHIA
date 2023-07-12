import { Login } from "./login.model";
import { Resenia } from "./resenia";
import { Reserva } from "./reserva";

export class Usuario extends Login {
    _id!: string;
    nombre: string;
    apellido: string
    email: string;
    dni: string;
    fechaNacimiento: string;
    edad: number;
    reservas: Array<Reserva>;
    resenias: Array<Resenia>;

    constructor() {
        super();
        this.nombre = '';
        this.apellido = '';
        this.email = '';
        this.dni = '';
        this.fechaNacimiento = '';
        this.edad = 0;
        this.reservas = new Array<Reserva>();
        this.resenias = new Array<Resenia>();
    }
}
