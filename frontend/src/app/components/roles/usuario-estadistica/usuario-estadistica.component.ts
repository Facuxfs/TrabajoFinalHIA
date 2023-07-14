import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import { Servicio } from 'src/app/models/servicio';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-usuario-estadistica',
  templateUrl: './usuario-estadistica.component.html',
  styleUrls: ['./usuario-estadistica.component.css']
})
export class UsuarioEstadisticaComponent implements OnInit {

  barra!:Chart;
  nombresLocalidades:Array<string>=[];
  cantidad:Array<number>=[];
  servicios!:Array<Servicio>;
  provincias:Array<string>=[  
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego",
    "Tucumán"];
  ngOnInit(): void {
    this.cargarServicios();
  }

  constructor(private serviceServicio:ServiciosService,private ciudadesService:CiudadesService){
    
  }

  cargarServicios(){
    this.servicios= new Array<Servicio>;
    this.serviceServicio.getServiciosTotal().subscribe(
      data=>{
        let servicio= new Servicio();
        data.forEach((element:any) => {
          Object.assign(servicio,element);
          this.servicios.push(servicio);
          servicio= new Servicio();
        });
      }
    )
  }
  
  provincia!:string;
  obtenerDatos(){
    this.nombresLocalidades=new Array<string>();
    this.cantidad=new Array<number>();
    var contador=0;
    this.ciudadesService.getLocalidadesPorProvincia(this.provincia).subscribe(
      data=>{ 
        data.municipios.forEach(
          (municipio:any)=>{
            for(let s of this.servicios){       
              if(municipio.id==s.ubicacion){
                contador++;
            };
           }
           if(contador>0){
              this.nombresLocalidades.push(municipio.nombre);
              this.cantidad.push(contador);
           }
            contador=0;
          }
        )
        this.barraDeServicios(this.cantidad,this.nombresLocalidades);
      }
    )
   
  }

  barraDeServicios(cantidad:Array<number>,nombres:Array<string>){
    //para destriur la barra si esta cargada
    if (this.barra) {
      this.barra.destroy();
    }

    this.barra= new Chart("barra", {
      type: 'bar',
      data: {
          labels: nombres,
          datasets: [{
              label: 'Servicios',
              data:cantidad,
          }]
      }
  });
  }
  

}
