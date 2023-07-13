export class Reserva {
    _id!: string;
    numeroReserva!: number;
    categoria!: string;
    nombreServicio!: string;
    cantidad!: number;
    fechaAlta!: string;
    fechaIngreso!: string;
    fechaEgreso!: string;
    precio!: number;
    reservado!: boolean;
    usuario!: string;
    servicio!: string;

    constructor() {
        this.numeroReserva = 0;
        this.categoria = '';
        this.nombreServicio = '';
        this.cantidad = 0;
        this.cargarFechaAlta();
        this.fechaIngreso = '';
        this.fechaEgreso = '';
        this.precio = 0;
        this.reservado = true;
        this.usuario = '';
        this.servicio = '';
    }

    /**
     * Carga fecha de alta con la fecha actual
     */
    cargarFechaAlta(): void {
        const fechaActual = new Date();

        const dia = fechaActual.getDate();

        const mes = fechaActual.getMonth() + 1;

        const anio = fechaActual.getFullYear();

        this.fechaAlta = `${dia}-${mes}-${anio}`;
    }
}
