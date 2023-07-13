import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as printJS from 'print-js';
import { AppComponent } from 'src/app/app.component';
import { Provincia } from 'src/app/models/provincia';
import { Reserva } from 'src/app/models/reserva';
import { Usuario } from 'src/app/models/usuario.model';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { HeaderComponent } from '../../layout/header/header.component';
 
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {

  id: any;
  usuario: Usuario;
  tipo: any;
  seleccion!: string;
  provincia!: Provincia;  //OBJ tipo Provincia que contiene informacion de la misma
  localidad!: Provincia;  //OBJ tipo Provincia que contiene solo el nombre y id de las localidades de una Provincia
  mostrarCard = false;
  localidades!: Array<Provincia>;
  reservasCliente!: Array<Reserva>;  // guarda las reservas del cliente logeado
  imagenes: string[] = [];
  provincias = [{ id: 1, name: "Buenos Aires" }, { id: 2, name: "Catamarca" },
  { id: 3, name: "Chaco" }, { id: 4, name: "Chubut" },
  { id: 5, name: "Cordoba" }, { id: 6, name: "Corrientes" },
  { id: 7, name: "Entre Rios" }, { id: 8, name: "Formosa" },
  { id: 9, name: "Jujuy" }, { id: 10, name: "La Pampa" },
  { id: 11, name: "La Rioja" }, { id: 12, name: "Mendoza" },
  { id: 13, name: "Misiones" }, { id: 14, name: "Neuquen" },
  { id: 15, name: "Rio Negro" }, { id: 16, name: "Salta" },
  { id: 17, name: "San Juan" }, { id: 18, name: "San Luis" },
  { id: 19, name: "Santa Cruz" }, { id: 20, name: "Santa Fe" },
  { id: 21, name: "Santiago del Estero" }, { id: 22, name: "Tierra del Fuego" },
  { id: 5, name: "Tucuman" }
  ];

  constructor(private appCom: AppComponent, private servicioU: UsuarioService, private _http: HttpClient, private reservaService: ReservaService, private ciudadService: CiudadesService, private router: Router) {
    this.id = sessionStorage.getItem("userId");
    this.appCom.logeado = true;
    this.usuario = new Usuario();
    this.provincia = new Provincia();
    this.localidades = new Array<Provincia>();
    this.reservasCliente = new Array<Reserva>();
    this.mostrarReservas();
  }

  ngOnInit(): void {
    this.id = sessionStorage.getItem("userId");
    this.tipo = sessionStorage.getItem("tipo");
    this.getUsuario();
  }

  getUsuario() {
    this.servicioU.getusuario(this.id)
      .subscribe(
        (res: any) => {
          Object.assign(this.usuario, res);
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )
  }

  mostrarReservas() {
    this.reservasCliente = new Array<Reserva>();
    console.log(this.id);
    this.reservaService.getReservaUsuario(this.id as string).subscribe(
      (result) => {
        let unaReserva = new Reserva();
        console.log(result);
        // Recorrer cada objeto en result y agregarlo al array reservasCliente
        result.forEach((element: any) => {
          Object.assign(unaReserva, element);
          this.reservasCliente.push(unaReserva);
          unaReserva = new Reserva();
        });
      },
      error => { alert("Error en la petición"); }
    );
  }



  mostrarTarjeta() {
    this.mostrarCard = true;
  }

  consultarProvincia(nombre: string) {
    this.ciudadService.getProvincias(nombre).subscribe(
      (result) => {
        this.localidades = new Array<Provincia>();
        this.provincia.nombre = result.provincias[0].nombre;
        this.provincia._id = result.provincias[0].id;
        this.provincia.lat = result.provincias[0].centroide.lat;
        this.provincia.long = result.provincias[0].centroide.lon;
        this.cargarLocalidades(this.provincia._id);
        this.buscarImagen(this.provincia);
      //  this.cargarClima(this.provincia);
        this.mostrarTarjeta();
      },
      error => { alert("Error en la petición"); })
  }

  cargarLocalidades(id: string) {
    this.ciudadService.getLocalidades(id).subscribe(
      (result) => {
        if (result && result.municipios) {
          for (let i = 0; i < result.municipios.length; i++) {
            this.localidad = new Provincia();
            this.localidad.nombre = result.municipios[i].nombre;
            this.localidad._id = result.municipios[i].id;
            this.localidades.push(this.localidad);
          }
        } else {
          console.error('La respuesta del servicio no tiene la estructura esperada.');
        }
      },
      error => { alert("Error en la petición"); }
    );
  }


  buscarImagen(provincia: Provincia) {
    this.ciudadService.buscarImagenPorPalabraClave(provincia.nombre).subscribe(
      (response) => {
        // Aquí puedes manejar la respuesta de la API de Unsplash
        var i;
        console.log(response);
        this.imagenes = [];
        for (const resultado of response.results) {
          const imagen = resultado.urls.small;
          this.imagenes.push(imagen);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  cargarClima(provincia: Provincia) {
    this.ciudadService.getClima(provincia.lat, provincia.long).subscribe(
      (result) => {
        console.log(result);
        this.provincia.clima = "temp max : " + result.ClimateDataMonth[7].tmax + ", temp min : " + result.ClimateDataMonth[7].tmin;
      },
      error => { alert("Error en la petición"); })
  }


  seleccionarLocalidad(localidad: Provincia) {
    this.router.navigate(['localidad-user', localidad.nombre, localidad._id]);
  }

  /// ****** TENGO QUE CAMBIAR TODO ESTE CODIGO AL COMPONENTE RESERVA ******** ////

  //Delete Reserva
  //se puede usar el Delete reserva solo si reserva.reservado es falso
  deleteReserva(reserva: Reserva) {
    if (reserva.reservado == false) {
      this.reservaService.deleteReserva(reserva._id).subscribe(
        res => {
          if (res.status == 1) {
            alert(res.msg);
            //recargar la lista de reservas
            this.mostrarReservas();
          }
        }, error => {
          alert(error.msg);
        }

      )
    } else {
      alert("No Puede Eliminar Esta Reserva: Llame al 3884593454");
    }
  }


  modificarReserva(reserva: Reserva) {
    this.router.navigate(['reservaForm', reserva._id, reserva.servicio]);
  }


  //Filtros de Reserva

  reservado!: boolean;
  filtrarReservaPorReservado() {
    this.reservasCliente = new Array<Reserva>();
    this.reservaService.getReservaUsuarioAndReservado(this.id as string, this.reservado).subscribe(
      res => {
        let unaReserva = new Reserva();
        res.forEach((element: any) => {
          Object.assign(unaReserva, element);
          this.reservasCliente.push(unaReserva);
          unaReserva = new Reserva();
        });
      }, error => {
        console.log(error);
      }
    )
  }


  cat: string = "";
  filtrarPorCategoria() {
    this.reservasCliente = new Array<Reserva>();
    this.reservaService.getReservaUsuarioAndCategoria(this.id as string, this.cat).subscribe(
      res => {
        let unaReserva = new Reserva();
        res.forEach((element: any) => {
          Object.assign(unaReserva, element);
          this.reservasCliente.push(unaReserva);
          unaReserva = new Reserva();
        });
      }, error => {
        console.log(error);
      }
    )
  }

  nomServicio!: string;
  filtrarPorNombreDeServicio() {
    if (this.nomServicio.length > 0) {
      this.reservasCliente = new Array<Reserva>();
      this.reservaService.getReservaUsuarioAndNombreDeServicio(this.id as string, this.nomServicio).subscribe(
        res => {
          let unaReserva = new Reserva();
          res.forEach((element: any) => {
            Object.assign(unaReserva, element);
            this.reservasCliente.push(unaReserva);
            unaReserva = new Reserva();
          });

          console.log(this.reservasCliente);
        }, error => {
          console.log(error);
        }
      )
    }
  }

  /**
   * Imprime los datos de una Reserva
   * @param reserva 
   */
  imprimirReserva(reserva: Reserva): void {
    const reservaHTML = `
      <style>
        .receipt-container {
          font-family: Arial, sans-serif;
          border: 1px solid #ccc;
          padding: 20px;
          width: 100%;
          box-sizing: border-box;
          background-image: url('/assets/logo-turismoapp2-transparente.png');
          background-repeat: no-repeat;
          background-size: 200px;
          background-position: center;
        }

        .receipt-title {
          text-align: center;
          font-size: 30px;
          margin-bottom: 30px;
        }

        .receipt-item {
          margin-bottom: 20px;
        }

        .receipt-item-label {
          font-weight: bold;
          width: 150px;
          display: inline-block;
        }

        .receipt-item-value {
          display: inline-block;
          margin-left: 20px;
        }
      </style>

      <div class="receipt-container">
        <h1 class="receipt-title">Reserva</h1>
        <div class="receipt-item">
          <span class="receipt-item-label">ID:</span>
          <span class="receipt-item-value">${reserva._id}</span>
        </div>
        <div class="receipt-item">
          <span class="receipt-item-label">N° Reserva:</span>
          <span class="receipt-item-value">${reserva.numeroReserva}</span>
        </div>
        <div class="receipt-item">
          <span class="receipt-item-label">Categoría:</span>
          <span class="receipt-item-value">${reserva.categoria}</span>
        </div>
        <div class="receipt-item">
          <span class="receipt-item-label">Servicio:</span>
          <span class="receipt-item-value">${reserva.nombreServicio}</span>
        </div>
        <div class="receipt-item">
          <span class="receipt-item-label">Cantidad:</span>
          <span class="receipt-item-value">${reserva.cantidad}</span>
        </div>
        <div class="receipt-item">
          <span class="receipt-item-label">Fecha de alta:</span>
          <span class="receipt-item-value">${reserva.fechaAlta}</span>
        </div>
        <div class="receipt-item">
          <span class="receipt-item-label">Fecha de ingreso:</span>
          <span class="receipt-item-value">${reserva.fechaIngreso}</span>
        </div>
        <div class="receipt-item">
          <span class="receipt-item-label">Fecha de egreso:</span>
          <span class="receipt-item-value">${reserva.fechaEgreso}</span>
        </div>
        <div class="receipt-item">
          <span class="receipt-item-label">Precio(ARS):</span>
          <span class="receipt-item-value">${reserva.precio}$</span>
        </div>
        <div class="receipt-item">
          <span class="receipt-item-label">Estado:</span>
          <span class="receipt-item-value">${reserva.reservado ? 'Aceptada' : 'Cancelada'}</span>
        </div>
      </div>
    `;

    const printContainer = document.createElement('div');

    printContainer.innerHTML = reservaHTML;

    const printableContent = printContainer.innerHTML;

    printJS({
      printable: printableContent,

      type: 'raw-html',

      documentTitle: 'Reserva'
    });
  }
}