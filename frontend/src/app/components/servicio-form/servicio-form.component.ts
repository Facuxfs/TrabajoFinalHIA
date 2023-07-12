import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Gestor } from 'src/app/models/gestor';
import { Provincia } from 'src/app/models/provincia';
import { Resenia } from 'src/app/models/resenia';
import { Reserva } from 'src/app/models/reserva';
import { Servicio } from 'src/app/models/servicio';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { GestorService } from 'src/app/services/gestor.service';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-servicio-form',
  templateUrl: './servicio-form.component.html',
  styleUrls: ['./servicio-form.component.css']
})
export class ServicioFormComponent implements OnInit {

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

  servicio!: Servicio;
  seleccion!: string;
  localidad!: Provincia;
  gestor!: Gestor;
  localidades!: Array<Provincia>;
  id: any;
  idGestor: string = "";

  constructor(private route: ActivatedRoute, private ciudadService: CiudadesService, private servicioService: ServiciosService, private router: Router, private gestorService: GestorService) {
    this.servicio = new Servicio();
    this.servicio.calificacionTotal = 0;
    this.servicio.resenia = new Array<Resenia>();
    this.servicio.reservas = new Array<Reserva>();
    //this.obtenerGestor(this.id);
    this.localidad = new Provincia();
    this.localidades = new Array<Provincia>();

   
  }

  ngOnInit() {
    this.id = sessionStorage.getItem("userId");

    this.servicio.gestor = this.id as string;
    // this.route.params.subscribe(params => {
    //   this.id = params['id'];
    //   this.idGestor = params['idGestor'];
    //   this.servicio.gestor = params['id'];
    // });
  }

  guardarServicio(servicio: Servicio) {
    this.servicioService.crearServicio(this.servicio).subscribe(
      (result: any) => {
        if (result.status == 1) {
          alert(result.msg);
          this.router.navigate(["gestor"])
        }
      },
      error => {
        alert(error.msg);
      }
    )
  }

  // obtenerGestor(id: string): void {
  //   this.gestorService.getGestor(id).subscribe(
  //     result => {
  //       this.gestor = result;
  //       // this.servicio.gestor = this.gestor;
  //     },
  //     error => {
  //     }
  //   )
  // }

  consultarProvincia(nombre: string) {
    this.ciudadService.getProvincias(nombre).subscribe(
      (result) => {
        this.localidad._id = result.provincias[0].id;
        this.cargarLocalidades(this.localidad._id);
      },
      error => { alert("Error en la petición"); })
  }

  cargarLocalidades(id: string) {
    this.ciudadService.getLocalidades(id).subscribe(
      (result) => {
        console.log(result);
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


}

