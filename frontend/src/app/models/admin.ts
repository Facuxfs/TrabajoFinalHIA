import { Login } from "./login.model";

export class Admin extends Login {

      _id!: string;
    nombre!: string;
    apellido!: string;
    email!: string;
    dni!: string;
    fechaNacimiento!: string;
    edad!: number;

}
