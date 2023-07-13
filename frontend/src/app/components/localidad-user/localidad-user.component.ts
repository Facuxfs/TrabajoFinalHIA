import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Servicio } from 'src/app/models/servicio';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-localidad-user',
  templateUrl: './localidad-user.component.html',
  styleUrls: ['./localidad-user.component.css']
})
export class LocalidadUserComponent implements OnInit {

  nombre:string=""
  id:string=""
  servicios!:Array<Servicio>;
  servicio!: any;
  indice: number = 0;
  constructor(private route: ActivatedRoute, private router: Router, private serviceServicios:ServiciosService, private toastr:ToastrService ){   
   }

  cargarServicios(id:string){
    this.serviceServicios.getServicios(id).subscribe(
      result =>{
        console.log(result)
        this.servicios = new Array<Servicio>();
        let unaServicio:Servicio= new Servicio();
          result.forEach((element:any) => {
          Object.assign(unaServicio,element)
          this.servicios.push(unaServicio)
          unaServicio = new Servicio();
          this.iniciar();
        });
      } ,
      error=>{
      }
    )
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.nombre = params['nombre'];
       this.id = params['id'];
       this.cargarServicios(this.id);
    });
  }
  
  obtenerReseniaServ(servicio: Servicio) {//produ:NgForm){
    this.router.navigate(['reseniaSer',servicio._id]);
  }
  iniciar(){
    if (this.indice < this.servicios.length){
      this.servicio = this.servicios[this.indice];
    }
  }

  siguiente(){
    this.indice = this.indice +1;
    if (this.indice < this.servicios.length){
      this.servicio = this.servicios[this.indice];
    }
  }

  anterior(){
    this.indice = this.indice -1;
    if (this.indice < this.servicios.length){
      this.servicio = this.servicios[this.indice];
    }
  }
  cargar(servicio: Servicio) {//produ:NgForm){
    this.router.navigate(['reseniaForm',0,servicio._id]);
  }

  realizarReserva(idServicio:string){
    this.router.navigate(["reservaForm",0,idServicio]);
  }
}
