import { Component, OnInit } from '@angular/core';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { HttpClient } from '@angular/common/http';
import { Provincia } from 'src/app/models/provincia';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent implements OnInit {

  seleccion!: string;
  provincia!: Provincia;  //OBJ tipo Provincia que contiene informacion de la misma
  localidad!: Provincia;  //OBJ tipo Provincia que contiene solo el nombre y id de las localidades de una Provincia
  mostrarCard = false;
  localidades!: Array<Provincia>;
  imagenes: string[] = [];


  provincias = [{ id: 1, name: "Buenos Aires" },{ id: 2, name: "Catamarca" },
  { id: 3, name: "Chaco" },{ id: 4, name: "Chubut" },
  { id: 5, name: "Cordoba" },{ id: 6, name: "Corrientes" },
  { id: 7, name: "Entre Rios" },{ id: 8, name: "Formosa" },
  { id: 9, name: "Jujuy" },{ id: 10, name: "La Pampa" },
  { id: 11, name: "La Rioja" },{ id: 12, name: "Mendoza" },
  { id: 13, name: "Misiones" },{ id: 14, name: "Neuquen" },
  { id: 15, name: "Rio Negro" },{ id: 16, name: "Salta" },
  { id: 17, name: "San Juan" },{ id: 18, name: "San Luis" },
  { id: 19, name: "Santa Cruz" },{ id: 20, name: "Santa Fe" },
  { id: 21, name: "Santiago del Estero" },{ id: 22, name: "Tierra del Fuego" },
  { id: 5, name: "Tucuman" }
  ];


  constructor(private _http: HttpClient, private ciudadService: CiudadesService, private router: Router, private toastr:ToastrService) {
    this.provincia = new Provincia();
    this.localidades = new Array<Provincia>();
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
        this.cargarClima(this.provincia);
        this.mostrarTarjeta();
      },
      error => { this.toastr.error('el Api no responde'); })
      
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
          this.toastr.error('el Api no responde');
        }
      },
      error => {  this.toastr.error('el Api no responde');}
    );
  }
  

  buscarImagen(provincia: Provincia) {
    this.ciudadService.buscarImagenPorPalabraClave(provincia.nombre).subscribe(
      (response) => {
        // Aquí puedes manejar la respuesta de la API de Unsplash
        var i;
        console.log(response);
        this.imagenes= [];
        for (const resultado of response.results) {
          const imagen = resultado.urls.small;
          this.imagenes.push(imagen);
        }
      },
      (error) => {
        this.toastr.error('el Api no responde');
      }
    );
  }

  cargarClima(provincia:Provincia) {
    this.ciudadService.getClima(provincia.lat,provincia.long).subscribe(
      (result) => {
        console.log(result);
        this.provincia.clima = "temp max : " +result.ClimateDataMonth[7].tmax+ ", temp min : "+result.ClimateDataMonth[7].tmin;
      },
      error => {  this.toastr.error('el Api no responde'); })
  }


  seleccionarLocalidad(localidad:Provincia){
    this.router.navigate(['localidad-user',localidad.nombre,localidad._id]);
  }
  

  ngOnInit(): void {
  }

}
