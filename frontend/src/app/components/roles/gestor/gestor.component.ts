import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, map, mergeMap } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Gestor } from 'src/app/models/gestor';
import { Resenia } from 'src/app/models/resenia';
import { Reserva } from 'src/app/models/reserva';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario.model';
import { GestorService } from 'src/app/services/gestor.service';
import { ReseniaService } from 'src/app/services/resenia.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.css']
})
export class GestorComponent implements OnInit {

  id: any;
  tipo: any;
  gestor!: Gestor;
  servicios: Array<Servicio>;
  usuarios:Array<Usuario>;
  resenias:Array<Resenia>;
  verResenia:boolean=false; 
  verReserva:boolean=false;
  reservas:Array<Reserva>;
  constructor(private appCom: AppComponent, private servicioService: ServiciosService, private gestorService: GestorService,private usuarioService:UsuarioService,private reseniaService:ReseniaService,private reservaService:ReservaService, private router: Router) {
    this.appCom.logeado = true;
    this.servicios = new Array<Servicio>();
    this.usuarios=new Array<Usuario>();
    this.resenias=new Array<Resenia>();
    this.reservas=new Array<Reserva>();
  }

  ngOnInit(): void {
    this.id = sessionStorage.getItem("userId");
    this.tipo = sessionStorage.getItem("tipo");
    this.cargarServicios();
  }

  cargarGestor(): void {
    this.gestor = new Gestor();
    this.gestorService.getGestor(this.id).subscribe(
      (result:any) => {
        Object.assign(this.gestor, result);
      },
      error => { console.log(error)
      }
    )
  }  

  irFormularioServicio(): void {
    this.router.navigate(['servicio-form']);
  }

  cargarServicios(){
    this.verResenia=false;
    this.verReserva=false;
    this.servicios=[]
    this.gestorService.getGestor(this.id).pipe(
      map((res: any) => res.servicio),
      mergeMap((servicios: string[]) => forkJoin(servicios.map(ser => this.buscarServicio(ser))))
    ).subscribe(
      (res: any[]) => {
        console.log(res)
      },
      err => {
        console.log(err);
      }
    );
  }

  buscarServicio(id:string){
    this.servicioService.getServicio(id)
    .subscribe(
      (res:any)=>{
        let servicio:Servicio=new Servicio()
             Object.assign(servicio,res);
        this.servicios.push(servicio)
      },
      err=>{
        console.log(err)
      }
    )
  }

  async cargarResenias(id:string){
      this.verResenia=true;
      this.verReserva=false;
      this.resenias=[];
      const index= this.servicios.findIndex(res=>res._id==id);
      if(index !==-1){
        for(let resenia of this.servicios[index].resenia){
          console.log("es:"+resenia);
         await this.buscarResenias(resenia.toString());
        }
   
      }
  }    

  buscarResenias(id:string){
    this.reseniaService.getResenia(id)
    .subscribe(
      (res:any)=>{
         let resenia:Resenia=new Resenia();
         Object.assign(resenia,res);
         this.resenias.push(resenia);
        console.log(this.resenias)
      },
      err=>{
         console.log(err)
      }
    )
  }

  async cargarReservas(id: string) {    
    this.verReserva=true;
    this.verResenia=false
    this.reservas = [];
    const index = this.servicios.findIndex(res => res._id === id);
    if (index !== -1) {
      await Promise.all(this.servicios[index].reservas.map(reserva => this.buscarReserva(reserva.toString())));
    }
    await this.cargarUsuario();
  }
  
  buscarReserva(id: string) {
    return new Promise<void>((resolve, reject) => {
      this.reservaService.getReserva(id)
        .subscribe(
          (res: any) => {
            let reserva: Reserva = new Reserva();
            Object.assign(reserva, res);
            this.reservas.push(reserva);
            console.log(this.reservas);
            resolve(); // Resuelve la promesa cuando se completa la búsqueda de reserva
          },
          err => {
            console.log(err);
            reject(err); // Rechaza la promesa si hay un error en la búsqueda de reserva
          }
        );
    });
  }
  
  async cargarUsuario() {
    this.usuarios = [];
    for (let reserva of this.reservas) {
      console.log("usuario: " + reserva.usuario);
      await this.buscarUsuario(reserva.usuario.toString());
    }
  }
  
  buscarUsuario(id: string) {
    return new Promise<void>((resolve, reject) => {
      this.usuarioService.getusuario(id)
        .subscribe(
          (res: any) => {
            let usuario: Usuario = new Usuario();
            Object.assign(usuario, res);
            this.usuarios.push(usuario);
            console.log(res);
            resolve(); // Resuelve la promesa cuando se completa la búsqueda de usuario
          },
          err => {
            console.log(err);
            reject(err); // Rechaza la promesa si hay un error en la búsqueda de usuario
          }
        );
    });
  }
  
  cat:string="";
  filtrarCategoria(){
    this.verResenia=false;
    this.verReserva=false;
    this.servicios=[]
    this.servicioService.getServicioGestor(this.id,this.cat)
    .subscribe(
      (res:any)=>{
        res.forEach((element:any) => {
            let servicio=new Servicio();
            Object.assign(servicio,element);
            this.servicios.push(servicio);
        });
        console.log(res[0]);
      },
      err=>{
        console.log(err);
      }
    )
  }

  nombreServicio:string="";
  filtrarPorNombreServicio(){
    this.verResenia=false;
    this.verReserva=false;
    this.servicios=[];
    this.servicioService.getServicioNombre(this.id,this.nombreServicio)
    .subscribe(
      (res:any)=>{
        res.forEach((element:any)=>{
           let servicio=new Servicio();
           Object.assign(servicio,element);
           this.servicios.push(servicio);
        })
      },
      err=>{
        console.log(err);
      }
    )
  }

  

  aceptarReserva(idReserva:string){
    this.reservaService.getReserva(idReserva).subscribe(
      (res:any)=>{
           let unaReserva=new Reserva();
           Object.assign(unaReserva,res);
           unaReserva.reservado = true ;
           this.reservaService.modificarReserva(unaReserva).subscribe(
           )
          // this.toastr.success('Reserva :'+ unaReserva.nombreServicio , 'aceptada!');
          location. reload()
      },
      err=>{
        console.log(err);
      }
    )
  }

  cancelarReserva(idReserva:string){
    this.reservaService.getReserva(idReserva).subscribe(
      (res:any)=>{
           let unaReserva=new Reserva();
           Object.assign(unaReserva,res);
           unaReserva.reservado = false ;
           this.reservaService.modificarReserva(unaReserva).subscribe(
            
           )
          // this.toastr.info('Reserva :'+ unaReserva.nombreServicio , 'rechazada');
          location. reload()
      },
      err=>{
        console.log(err);
      }
    )
  }

  eliminarServicio(id:string){
    console.log(id)
    this.servicioService.deleteServicio(id)
    .subscribe(
      (res:any)=>{
        
        alert("Se dio de beja el servicio")
        this.cargarServicios();
      },
      err=>{
        console.log(err)
      }
    )
  }
}
