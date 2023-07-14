import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Servicio } from 'src/app/models/servicio';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-usuario-estadistica',
  templateUrl: './usuario-estadistica.component.html',
  styleUrls: ['./usuario-estadistica.component.css']
})
export class UsuarioEstadisticaComponent implements OnInit {

  barraT!:Chart;
  nombresLocalidades:Array<string>=[];
  cantidad:Array<number>=[];
  servicios!:Array<Servicio>;
  provincias:Array<string>=['jujuy','salta','tucuman','cordoba','corrientes'];
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
      }
    )
    console.log(this.nombresLocalidades,"d");
    console.log(this.cantidad,"e");
    this.barra(this.cantidad,this.nombresLocalidades);
  }

  barra(cantidad:Array<number>,nombres:Array<string>){
    //para destriur la barra si esta cargada
    if (this.barraT) {
      this.barraT.destroy();
    }

    this.barraT= new Chart("barra", {
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
