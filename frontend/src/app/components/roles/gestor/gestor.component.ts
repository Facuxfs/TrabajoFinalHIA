import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as printJS from 'print-js';
import { forkJoin, map, mergeMap } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Gestor } from 'src/app/models/gestor';
import { Resenia } from 'src/app/models/resenia';
import { Reserva } from 'src/app/models/reserva';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario.model';
import { CiudadesService } from 'src/app/services/ciudades.service';
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
  idReserva!:string;
  usuarioEmail!:Usuario;
  
  constructor(private appCom: AppComponent , private email:CiudadesService,private toastr:ToastrService, private servicioService: ServiciosService, private gestorService: GestorService,private usuarioService:UsuarioService,private reseniaService:ReseniaService,private reservaService:ReservaService, private router: Router) {
    this.appCom.logeado = true; 

    this.servicios = new Array<Servicio>();
    this.usuarios = new Array<Usuario>();
    this.resenias = new Array<Resenia>();
    this.reservas = new Array<Reserva>();
  }

  ngOnInit(): void {
    this.id = sessionStorage.getItem("userId");
    this.tipo = sessionStorage.getItem("tipo");
    this.cargarServicios();
    this.cargarGestor();
  }

  cargarGestor(): void {
    this.gestor = new Gestor();
    this.gestorService.getGestor(this.id).subscribe(
      (result: any) => {
        Object.assign(this.gestor, result);
      },
      error => {
        console.log(error)
      }
    )
  }

  irFormularioServicio(): void {
    this.router.navigate(['servicio-form']);
  }

  cargarServicios() {
    this.verResenia = false;
    this.verReserva = false;
    this.servicios = []
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

  buscarServicio(id: string) {
    this.servicioService.getServicio(id)
      .subscribe(
        (res: any) => {
          let servicio: Servicio = new Servicio()
          Object.assign(servicio, res);
          this.servicios.push(servicio)
        },
        err => {
          console.log(err)
        }
      )
  }

  async cargarResenias(id: string) {
    this.verResenia = true;
    this.verReserva = false;
    this.resenias = [];
    const index = this.servicios.findIndex(res => res._id == id);
    if (index !== -1) {
      for (let resenia of this.servicios[index].resenia) {
        console.log("es:" + resenia);
        await this.buscarResenias(resenia.toString());
      }

    }
  }

  buscarResenias(id: string) {
    this.reseniaService.getResenia(id)
      .subscribe(
        (res: any) => {
          let resenia: Resenia = new Resenia();
          Object.assign(resenia, res);
          this.resenias.push(resenia);
          console.log(this.resenias)
        },
        err => {
          console.log(err)
        }
      )
  }

  async cargarReservas(id: string, pendiente: boolean) {
    this.verReserva = true;
    this.verResenia = false
    this.reservas = [];
    const index = this.servicios.findIndex(res => res._id === id);
    if (index !== -1) {
      await Promise.all(this.servicios[index].reservas.map(reserva => this.buscarReserva(reserva.toString(), pendiente)));
    }
    await this.cargarUsuario();
  }

  buscarReserva(id: string, pendiente: boolean) {
    return new Promise<void>((resolve, reject) => {
      this.reservaService.getReserva(id)
        .subscribe(
          (res: any) => {
            let reserva: Reserva = new Reserva();
            Object.assign(reserva, res);
            if (pendiente === reserva.reservado) {
              this.reservas.push(reserva);
              console.log(this.reservas);
              resolve();
            } else if (!pendiente && !reserva.reservado) {
              this.reservas.push(reserva);
              console.log(this.reservas);
              resolve();
            } else {
              resolve(); // Resuelve la promesa cuando se completa la búsqueda de reserva
            }
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

  cat: string = "";
  filtrarCategoria() {
    this.verResenia = false;
    this.verReserva = false;
    this.servicios = []
    this.servicioService.getServicioGestor(this.id, this.cat)
      .subscribe(
        (res: any) => {
          res.forEach((element: any) => {
            let servicio = new Servicio();
            Object.assign(servicio, element);
            this.servicios.push(servicio);
          });
          console.log(res[0]);
        },
        err => {
          console.log(err);
        }
      )
  }

  nombreServicio: string = "";
  filtrarPorNombreServicio() {
    this.verResenia = false;
    this.verReserva = false;
    this.servicios = [];
    this.servicioService.getServicioNombre(this.id, this.nombreServicio)
      .subscribe(
        (res: any) => {
          res.forEach((element: any) => {
            let servicio = new Servicio();
            Object.assign(servicio, element);
            this.servicios.push(servicio);
          })
        },
        err => {
          console.log(err);
        }
      )
  }



  aceptarReserva(idReserva:string,emailUsuario:string){
    
    this.reservaService.getReserva(idReserva).subscribe(
      (res:any)=>{
           let unaReserva=new Reserva();
           Object.assign(unaReserva,res);
           unaReserva.reservado = true ;
           let asunto:string="Alerta : reserva aprobada ";
           let mensaje:string = "La reserva que solciito en " + unaReserva.nombreServicio + " con fecha :" + unaReserva.fechaIngreso + "ah sido aprobada"; 
           this.email.enviarCorreo(emailUsuario,asunto,mensaje).subscribe(res=>{
            
            this.toastr.success("Email enviado al usuario")
          })
           this.reservaService.modificarReserva(unaReserva).subscribe(
           )
           this.toastr.success('Reserva :'+ unaReserva.nombreServicio , 'aceptada!');
          this.cargarServicios()//SE RECARGA LOS SERVICIOS DEL GESTOR
      },
      err => {
        console.log(err);
      }
    )
  }


  cancelarReserva(idReserva:string,emailUsuario:string){
    this.reservaService.getReserva(idReserva).subscribe(
      (res:any)=>{
           let unaReserva=new Reserva();
           Object.assign(unaReserva,res);
           unaReserva.reservado = false ;
           let asunto:string="Alerta : reserva rechazada ";
           let mensaje:string = "Lamentamos informarle que la reserva que solciito en " + unaReserva.nombreServicio + " con fecha :" + unaReserva.fechaIngreso + "ah sido rechazada"; 
           this.email.enviarCorreo(emailUsuario,asunto,mensaje).subscribe(res=>{
            this.toastr.success("Email enviado al usuario")
          })
           this.reservaService.modificarReserva(unaReserva).subscribe(
            
           )
          this.toastr.info('Reserva :'+ unaReserva.nombreServicio , 'rechazada');
      },
      err=>{
        console.log(err);
      }
    )

  }

  actualizarServicio(id: string) {
    this.router.navigate(['gestor/servicio/' + id])
  }

  eliminarServicio(id: string) {
    if (confirm("Esta Serguro de Eliminar el servicio?")) {
      this.servicioService.deleteServicio(id)
        .subscribe(
          (res: any) => {
            this.toastr.success('Servicio eliminado');
            this.cargarServicios();
          },
          err => {
            console.log(err)
            this.toastr.success('Error al eliminar el servicio');
          }
        )
    }
  }

  /**
   * Imprime los datos de un Servicio
   * @param servicio 
   */
  imprimirServicio(servicio: Servicio): void {

    const servicioHTML = `
      <style>
        .gestor-container {
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

        .gestor-title {
          text-align: center;
          font-size: 30px;
          margin-bottom: 30px;
        }

        .gestor-item {
          margin-bottom: 20px;
        }

        .gestor-item-label {
          font-weight: bold;
          width: 150px;
          display: inline-block;
        }

        .gestor-item-value {
          display: inline-block;
          margin-left: 20px;
        }
      </style>

      <div class="gestor-container">
        <h1 class="gestor-title">Servicio</h1>
        <div class="gestor-item">
          <span class="gestor-item-label">ID:</span>
          <span class="gestor-item-value">${servicio._id}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Nombre servicio:</span>
          <span class="gestor-item-value">${servicio.nombre}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Categoria:</span>
          <span class="gestor-item-value">${servicio.categoria}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Ubicacion:</span>
          <span class="gestor-item-value">${servicio.ubicacion}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Calificacion:</span>
          <span class="gestor-item-value">${servicio.calificacionTotal}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Nombre gestor:</span>
          <span class="gestor-item-value">${this.gestor.nombre +" "+this.gestor.apellido}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Cantidad de resenias:</span>
          <span class="gestor-item-value">${servicio.resenia.length}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Cantidad de reservas:</span>
          <span class="gestor-item-value">${servicio.reservas.length}</span>
        </div>
      </div>
    `;

    const printContainer = document.createElement('div');

    printContainer.innerHTML = servicioHTML;

    const printableContent = printContainer.innerHTML;

    printJS({
      printable: printableContent,

      type: 'raw-html',

      documentTitle: 'Servicio'
    });
  }

  /**
   * Imprime los datos de una Reserva
   * @param reserva 
   */
  imprimirReserva(reserva: Reserva): void {
    let usuario=new Usuario();
    for(let user of this.usuarios){
        if(reserva.usuario==user._id){
          usuario=user;
        }
    }
    const reservaHTML = `
      <style>
        .gestor-container {
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

        .gestor-title {
          text-align: center;
          font-size: 30px;
          margin-bottom: 30px;
        }

        .gestor-item {
          margin-bottom: 20px;
        }

        .gestor-item-label {
          font-weight: bold;
          width: 150px;
          display: inline-block;
        }

        .gestor-item-value {
          display: inline-block;
          margin-left: 20px;
        }
      </style>

      <div class="gestor-container">
        <h1 class="gestor-title">Servicio</h1>
        <div class="gestor-item">
          <span class="gestor-item-label">ID:</span>
          <span class="gestor-item-value">${reserva._id}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">N° Reserva:</span>
          <span class="gestor-item-value">${reserva.numeroReserva}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Categoria:</span>
          <span class="gestor-item-value">${reserva.categoria}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Ubicacion:</span>
          <span class="gestor-item-value">${reserva.nombreServicio}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Cantidad de personas:</span>
          <span class="gestor-item-value">${reserva.cantidad}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Fecha de solicitud:</span>
          <span class="gestor-item-value">${reserva.fechaAlta}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Fecha de ingreso:</span>
          <span class="gestor-item-value">${reserva.fechaIngreso}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Fecha de egreso:</span>
          <span class="gestor-item-value">${reserva.fechaEgreso}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Precio:</span>
          <span class="gestor-item-value">${reserva.precio} $</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Estado:</span>
          <span class="gestor-item-value">${reserva.reservado ? 'Aceptada' : 'Rechazada'}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Usuario</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Nombre:</span>
          <span class="gestor-item-value">${usuario.nombre+" "+usuario.apellido}</span>
        </div>
        <div class="gestor-item">
        <span class="gestor-item-label">Dni:</span>
        <span class="gestor-item-value">${usuario.dni}</span>
      </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Email:</span>
          <span class="gestor-item-value">${usuario.email}</span>
        </div>
      </div>
    `;

    const printContainer = document.createElement('div');

    printContainer.innerHTML = reservaHTML;

    const printableContent = printContainer.innerHTML;

    printJS({
      printable: printableContent,

      type: 'raw-html',

      documentTitle: 'Resenia'
    });
  }

  /**
   * Imprime los datos de una Resenia
   * @param resenia 
   */
  imprimirResenia(resenia: Resenia): void {
    let nombreUsuario;
 
    const reseniaHTML = `
      <style>
        .gestor-container {
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

        .gestor-title {
          text-align: center;
          font-size: 30px;
          margin-bottom: 30px;
        }

        .gestor-item {
          margin-bottom: 20px;
        }

        .gestor-item-label {
          font-weight: bold;
          width: 150px;
          display: inline-block;
        }

        .gestor-item-value {
          display: inline-block;
          margin-left: 20px;
        }
      </style>

      <div class="gestor-container">
        <h1 class="gestor-title">Servicio</h1>
        <div class="gestor-item">
          <span class="gestor-item-label">ID:</span>
          <span class="gestor-item-value">${resenia._id}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Valoracion:</span>
          <span class="gestor-item-value">${resenia.valoracion}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Fecha de alta:</span>
          <span class="gestor-item-value">${resenia.fechaAlta}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Comentario:</span>
          <span class="gestor-item-value">${resenia.comentario}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Nombre usuario:</span>
          <span class="gestor-item-value">${resenia.usuario.nombre}</span>
        </div>
      </div>
    `;

    const printContainer = document.createElement('div');

    printContainer.innerHTML = reseniaHTML;

    const printableContent = printContainer.innerHTML;

    printJS({
      printable: printableContent,

      type: 'raw-html',

      documentTitle: 'Reserva'
    });
  }
}