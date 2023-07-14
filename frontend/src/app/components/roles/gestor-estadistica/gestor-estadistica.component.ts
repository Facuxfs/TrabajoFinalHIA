import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'

import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-gestor-estadistica',
  templateUrl: './gestor-estadistica.component.html',
  styleUrls: ['./gestor-estadistica.component.css']
})
export class GestorEstadisticaComponent implements OnInit {
  idGestor!:any;
  chartPie!:Chart;
  barraReservaPorServicio!:Chart
  barraMesesReserva!:Chart;
  meses = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  constructor(private serviciosService:ServiciosService) { 
 
  }
 
  ngOnInit(): void {
    this.idGestor=sessionStorage.getItem('userId');

  }
 


  barra(nombres:Array<string>,reservas:Array<number>){
    if (this.barraMesesReserva) {
      this.barraMesesReserva.destroy();
    }
    this.barraMesesReserva=new Chart("barraServicioResevas",{
      type: 'bar',
      data: {
          labels: nombres,
          datasets: [{
              label: 'Reservas',
              data:reservas,
          }]
        },
     })
  }


  barraResenias(nombres:Array<string>,resenias:Array<number>){
    if (this.barraMesesReserva) {
      this.barraMesesReserva.destroy();
    }
    this.barraMesesReserva=new Chart("barraServicioResenias",{
      type: 'bar',
      data: {
          labels: nombres,
          datasets: [{
              label: 'Resenias',
              data:resenias,
          }]
        },
     })
  }

  nombreServicios:Array<string>=[];
  reservasNum:Array<number>=[]

  obtenerDatos2(){
  
    this.nombreServicios=new Array<string>();
    this.serviciosService.getServicioPorGestor(this.idGestor).subscribe(
      res=>{
        res.forEach(
          (ser:any)=>{
            this.nombreServicios.push(ser.nombre);
            this.reservasNum.push(ser.reservas.length);
        }
       )
        this.barra(this.nombreServicios,this.reservasNum);
      }
    )
  
  }

 
  reseniasNum:Array<number>=[];
  datosDeResenias(){
    
    this.nombreServicios=new Array<string>();
    this.serviciosService.getServicioPorGestor(this.idGestor).subscribe(
      res=>{
        res.forEach(
          (ser:any)=>{
            this.nombreServicios.push(ser.nombre);
            this.reseniasNum.push(ser.resenia.length);
        }

       )
        this.barraResenias(this.nombreServicios,this.reseniasNum);
      }
      
    )
  }


}
