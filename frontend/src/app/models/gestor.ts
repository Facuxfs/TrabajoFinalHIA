import { Login } from "./login.model";
import { Servicio } from "./servicio";

export class Gestor extends Login {
    _id!: string;
    nombre!: string;
    apellido!: string;
    email!: string;
    dni!: string;
    fechaNacimiento!: string;
    edad!: number;
    servicio!: Array<Servicio>;

    constructor() {
        super();
        this.nombre = '';
        this.apellido = '';
        this.email = '';
        this.dni = '';
        this.fechaNacimiento = '';
        this.edad = 0;
        this.servicio = [];
    }

    /**
     * Calcula la edad del Gestor
     */
    calcularEdad(): void {
        const fechaActual = new Date();

        const fechaNacimiento = new Date(this.fechaNacimiento);

        const diferenciaEnMilisegundos = fechaActual.getTime() - fechaNacimiento.getTime();

        const anios = Math.floor(diferenciaEnMilisegundos / (1000 * 60 * 60 * 24 * 365));

        this.edad = anios;
    }
}
