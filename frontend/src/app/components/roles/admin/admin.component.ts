import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import { Console, error } from 'console';
import * as printJS from 'print-js';
import { AppComponent } from 'src/app/app.component';
import { Admin } from 'src/app/models/admin';
import { Gestor } from 'src/app/models/gestor';
import { Resenia } from 'src/app/models/resenia';
import { Reserva } from 'src/app/models/reserva';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario.model';
import { AdminService } from 'src/app/services/admin.service';
import { GestorService } from 'src/app/services/gestor.service';
import { ReseniaService } from 'src/app/services/resenia.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  id: any;
  tipo: any
  administrador!: Admin;
  gestores!: Array<Gestor>;
  usuarios!: Array<Usuario>;
  reservas!: Array<Reserva>;
  resenias!: Array<Resenia>;
  servicios!: Array<Servicio>;
  tablaSeleccionada: string = 'gestores';
  reseniasUsuario!: Array<Resenia>;
  token!: any;
  constructor(private appCom: AppComponent, private adminService: AdminService, private reseniaService: ReseniaService
    , private gestorServicio: GestorService, private usuarioService: UsuarioService, private servicioService: ServiciosService,
    private reservaService: ReservaService , private router: Router, private toast:ToastrService) {
    this.appCom.logeado = true;
    this.cargarGestores();
    this.cargarUsuarios();
    this.cargarReservas();
    this.cargarServicios();
    this.cargarResenias()

  }

  ngOnInit(): void {
    this.appCom.logeado=true;
    this.id = sessionStorage.getItem("userId");
    this.tipo = sessionStorage.getItem("tipo");
    this.cargarAdministrador(this.id);
    this.token = sessionStorage.getItem("token")
    console.log(this.administrador);
  }

  cargarAdministrador(id: string) {
    this.administrador = new Admin();
    this.adminService.getAdmin(id).subscribe(
      result => {
        Object.assign(this.administrador, result[0]);
      },
      error => {
      }
    )
  }

  cargarTodaslasFunciones(){
    this.cargarGestores();
    this.cargarUsuarios();
    this.cargarReservas();
    this.cargarServicios();
    this.cargarResenias();
  }

  recargarFunciones(){
    if(this.tablaSeleccionada!=""){
      this.cargarTodaslasFunciones();
    }
  }

  // cargarReseniasUsuario(idUsuario: string) {
  //   this.reseniaService.getReseniaUsuario(idUsuario).subscribe(
  //     result => {
  //       console.log(result + "estas resenias son")

  //       this.reseniasUsuario.push()
  //     },
  //     error => {
  //     }
  //   )
  // }




  cargarGestores() {
    this.gestorServicio.getGestores().subscribe(
      (result) => {
        this.gestores = new Array<Gestor>();
        for (let i = 0; i < result.length; i++) {
          let unGestor = new Gestor();
          unGestor = result[i];
          this.gestores.push(unGestor);
        }
      },
      error => { alert("Error en la petición"); }
    );
  }

  cargarUsuarios() {
    this.usuarioService.getusuarios().subscribe(
      (result) => {
        this.usuarios = new Array<Usuario>();
        for (let i = 0; i < result.length; i++) {
          let unUsuario = new Usuario();
          unUsuario = result[i];
          this.usuarios.push(unUsuario);
        }
      },
      error => { alert("Error en la petición"); }
    );
  }

  eliminarGestor(id: string) {
    this.gestorServicio.deleteGestor(id)
      .subscribe(
        (res: any) => {
          this.toast.success('Gestor eliminado');
        },
        err => {
          this.toast.error('No se pudo eliminar al gestor');
        }
      )
    location.reload();
  }

  modificarGestor(gestor: Gestor) {
    this.router.navigate(['gestor-form',gestor._id]);
  }

  eliminarUsuario(id: string) {
    this.usuarioService.deleteUsuario(id)
      .subscribe(
        (res: any) => {
          this.toast.success('Usuario Eliminado');
        },
        err => {
          this.toast.error('No se pudo eliminar el usuario');
        }
      )
    location.reload();
  }

  modificarUsuario(usuario: Usuario) {
    this.router.navigate(['usuario-form',usuario._id]);
  }

  cargarReservas() {
    this.reservas = new Array<Reserva>();
    this.reservaService.getReservas().subscribe(
      res => {
        let reserva = new Reserva();
        res.forEach(
          (e: any) => {
            Object.assign(reserva, e);
            this.reservas.push(reserva);
            reserva = new Reserva();
          }
        )
      }, error => {
        this.toast.success('No se pueden cargar las reservas');
      }
    )
  }

  deleteReserva(reserva: Reserva) {
    this.reservaService.deleteReserva(reserva._id).subscribe(
      res => {
        if (res.status == 1) {
          this.toast.success('Reserva Eliminado');
          //recargar la lista de reservas
          this.cargarReservas();
        }
      }, error => {
        this.toast.error('No se pudo eliminar la Reserva');
      }
    )
  }

  cargarReservasDeUsuario(idUsuario:string) {
    this.reservas= new Array<Reserva>();
    this.reservaService.getReservaUsuario(idUsuario).subscribe(
      result => {
        let reserva= new Reserva();
        result.forEach(
          (e:any)=>{
            Object.assign(reserva,e);
            this.reservas.push(reserva);
            reserva= new Reserva();
          }
        )
        console.log(this.reservas);
      },
      error => {

      }
    )
  }

  cargarReservasDeServicios(idServicio:string){
    this.reservas = new Array<Reserva>();
    this.reservaService.getReservaPorServicio(idServicio).subscribe(
      res => {
        let reserva = new Reserva();
        res.forEach(
          (e: any) => {
            Object.assign(reserva, e);
            this.reservas.push(reserva);
            reserva = new Reserva();
          }
        )
      }, error => {

      }
    )
  }


  cargarResenias() {
    this.resenias = new Array<Resenia>();
    this.reseniaService.getMostarResenia().subscribe(
      res => {
        let resenia = new Resenia();
        res.forEach(
          (e: any) => {
            Object.assign(resenia, e);
            this.resenias.push(resenia);
            resenia = new Resenia();
          }
        )
      }, error => {
        alert("No se pueden cargar las Reservas")
      }
    )

  }

  modificarResenia(IdResenia: string) {
    this.router.navigate(['reseniaForm',IdResenia]);
  }

  eliminarResenia(idResenia: string) {
    this.reseniaService.delateResenia(idResenia).subscribe(
      res => {
        if (res.status == 1) {
          this.toast.success('Resenia eliminada');
          //recargar la lista de reservas
          this.cargarResenias();
        }
      }, error => {
        this.toast.error('No se pudo eliminar la resenia');
      }
    )
  }

  cargarReseniasUsuario(idUsuario: string) {
    this.resenias= new Array<Resenia>();
    this.reseniaService.getReseniaPorUsuario(idUsuario).subscribe(
      result => {
        let resenia= new Resenia();
        result.forEach(
          (e:any)=>{
            Object.assign(resenia,e);
            this.resenias.push(resenia);
            resenia= new Resenia();
          }
        )
        console.log(this.resenias);
      },
      error => {

      }
    )
  }

  cargarReseniasDeServicio(idServicio:string){
    this.resenias= new Array<Resenia>();
    this.reseniaService.getReseniaPorServicio(idServicio).subscribe(
      result => {
        let resenia= new Resenia();
        result.forEach(
          (e:any)=>{
            Object.assign(resenia,e);
            this.resenias.push(resenia);
            resenia= new Resenia();
          }
        )
      },
      error => {

      }
    )
  }




  cargarServicios() {
    this.servicios = new Array<Servicio>();
    this.servicioService.getServiciosTotal().subscribe(
      res => {
        let servicio = new Servicio();
        res.forEach(
          (e: any) => {
            Object.assign(servicio, e);
            this.servicios.push(servicio);
            servicio = new Servicio();
          }
        )
      }, error => {

      }
    )
  }

  eliminarServicio(idServicio:string){
    this.servicioService.deleteServicio(idServicio).subscribe(
      res => {
        if (res.status == 1) {
          this.toast.success('Servicio Eliminado');
          //recargar la lista de reservas
          this.cargarServicios();
        }
      }, error => {
        this.toast.error('No se pudo eliminar el servicio');
      }
    )
  }

  cargarServiciosPorGestor(idGestor:string){
    this.servicios = new Array<Servicio>();
    this.servicioService.getServicioPorGestor(idGestor).subscribe(
      res => {
        let servicio = new Servicio();
        res.forEach(
          (e: any) => {
            Object.assign(servicio, e);
            this.servicios.push(servicio);
            servicio = new Servicio();
          }
        )
      }, error => {

      }
    )
  }




  //******** FILTROS ******* */


  //Filtros para usuarios

  username!: string;
  buscarUsuarioPorUserName() {
    this.usuarios = new Array<Usuario>();
    this.usuarioService.getUsuarioPorUsername(this.username).subscribe(
      res => {
        let usuario = new Usuario();
        res.forEach((element: any) => {
          Object.assign(usuario, element);
          this.usuarios.push(usuario);
          usuario = new Usuario();
        });
      }, error => {
        console.log("error en recuperar la informacion")
      }
    )
  }

  emailUser!: string;
  buscarUsuarioPorEmail() {
    this.usuarios = new Array<Usuario>();
    this.usuarioService.getUsuarioPorEmail(this.emailUser).subscribe(
      res => {
        let usuario = new Usuario();
        res.forEach((element: any) => {
          Object.assign(usuario, element);
          this.usuarios.push(usuario);
          usuario = new Usuario();
        });
      }, error => {
        console.log("error en recuperar la informacion")
      }
    )
  }

  dniUser!: string;
  buscarUsuarioPorDni() {
    this.usuarios = new Array<Usuario>();
    this.usuarioService.getUsuarioPorDni(this.dniUser).subscribe(
      res => {
        let usuario = new Usuario();
        res.forEach((element: any) => {
          Object.assign(usuario, element);
          this.usuarios.push(usuario);
          usuario = new Usuario();
        });
      }, error => {
        console.log("error en recuperar la informacion")
      }
    )
  }


  //Filtros para gestores

  usernameGestor!: string;
  buscarGestorPorUsername() {
    this.gestores = new Array<Gestor>();
    this.gestorServicio.getGestorPorUsername(this.usernameGestor).subscribe(
      res => {
        let gestor = new Gestor();
        res.forEach((element: any) => {
          Object.assign(gestor, element);
          this.gestores.push(gestor);
          gestor = new Gestor();
        });
      }, error => {
        console.log("error en recuperar la informacion")
      }
    )
  }

  emailGestor!: string;
  buscarGestorPorEmail() {
    this.gestores = new Array<Gestor>();
    this.gestorServicio.getGestorPorEmail(this.emailGestor).subscribe(
      res => {
        let gestor = new Gestor();
        res.forEach((element: any) => {
          Object.assign(gestor, element);
          this.gestores.push(gestor);
          gestor = new Gestor();
        });
      }, error => {
        console.log("error en recuperar la informacion")
      }
    )
  }

  dniGestor!: string;
  buscarGestorPorDni() {
    this.gestores = new Array<Gestor>();
    this.gestorServicio.getGestorPorDni(this.dniGestor).subscribe(
      res => {
        let gestor = new Gestor();
        res.forEach((element: any) => {
          Object.assign(gestor, element);
          this.gestores.push(gestor);
          gestor = new Gestor();
        });
      }, error => {
        console.log("error en recuperar la informacion")
      }
    )
  }



  /**
   * Imprime los datos de un Gestor
   * @param gestor
   */
  imprimirGestor(gestor: Gestor): void {
    const gestorHTML = `
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
        <h1 class="gestor-title">Gestor</h1>
        <div class="gestor-item">
          <span class="gestor-item-label">ID:</span>
          <span class="gestor-item-value">${gestor._id}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Nombre:</span>
          <span class="gestor-item-value">${gestor.nombre}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Apellido:</span>
          <span class="gestor-item-value">${gestor.apellido}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Email:</span>
          <span class="gestor-item-value">${gestor.email}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">DNI:</span>
          <span class="gestor-item-value">${gestor.dni}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Fecha de nacimiento:</span>
          <span class="gestor-item-value">${gestor.fechaNacimiento}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Edad:</span>
          <span class="gestor-item-value">${gestor.edad}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Servicios:</span>
          <span class="gestor-item-value">${gestor.servicio.length}</span>
        </div>
      </div>
    `;

    const printContainer = document.createElement('div');

    printContainer.innerHTML = gestorHTML;

    const printableContent = printContainer.innerHTML;

    printJS({
      printable: printableContent,

      type: 'raw-html',

      documentTitle: 'Gestor'
    });
  }

  /**
   * Imprime los datos de un Usuario
   * @param usuario
   */
  imprimirUsuario(usuario: Usuario): void {
    const gestorHTML = `
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
        <h1 class="gestor-title">Usuario</h1>
        <div class="gestor-item">
          <span class="gestor-item-label">ID:</span>
          <span class="gestor-item-value">${usuario._id}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Nombre:</span>
          <span class="gestor-item-value">${usuario.nombre}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Apellido:</span>
          <span class="gestor-item-value">${usuario.apellido}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Email:</span>
          <span class="gestor-item-value">${usuario.email}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">DNI:</span>
          <span class="gestor-item-value">${usuario.dni}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Fecha de nacimiento:</span>
          <span class="gestor-item-value">${usuario.fechaNacimiento}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Edad:</span>
          <span class="gestor-item-value">${usuario.edad}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Reservas:</span>
          <span class="gestor-item-value">${usuario.reservas.length}</span>
        </div>
        <div class="gestor-item">
          <span class="gestor-item-label">Resenias:</span>
          <span class="gestor-item-value">${usuario.resenias.length}</span>
        </div>
      </div>
    `;

    const printContainer = document.createElement('div');

    printContainer.innerHTML = gestorHTML;

    const printableContent = printContainer.innerHTML;

    printJS({
      printable: printableContent,

      type: 'raw-html',

      documentTitle: 'Gestor'
    });
  }




   //Filtros Para Reservas

   idUser!:string;
   buscarReservasPorUsuario(){

     this.reservas= new Array<Reserva>();
     this.reservaService.getReservaUsuario(this.idUser).subscribe(
       res=>{
         let reserva=new Reserva();
         res.forEach((element: any) => {
           Object.assign(reserva, element);
           this.reservas.push(reserva);
           reserva = new Reserva();
         });
       },error=>{
         console.log("error al recuperar la informacion")
       }
     )
   }

   idService!:string;
   buscarReservasPorServicio(){
     this.reservas= new Array<Reserva>();
     this.reservaService.getReservaPorServicio(this.idService).subscribe(
       res=>{
         let reserva=new Reserva();
         res.forEach((element: any) => {
           Object.assign(reserva, element);
           this.reservas.push(reserva);
           reserva = new Reserva();
         });
       },error=>{
         console.log("error al recuperar la informacion")
       }
     )
   }

   estadoReserva!:boolean;
   buscarReservaPorEstadoDeReservacion(){
     this.reservas= new Array<Reserva>();
     this.reservaService.getReservaPorEstado(this.estadoReserva).subscribe(
       res=>{
         let reserva=new Reserva();
         res.forEach((element: any) => {
           Object.assign(reserva, element);
           this.reservas.push(reserva);
           reserva = new Reserva();
         });
       },error=>{
         console.log("error al recuperar la informacion")
       }
     )
   }

   categoriaReserva!:string;
   buscarReservaPorCategoria(){
     this.reservas= new Array<Reserva>();
     this.reservaService.getReservaPorCategoria(this.categoriaReserva).subscribe(
       res=>{
         let reserva=new Reserva();
         res.forEach((element: any) => {
           Object.assign(reserva, element);
           this.reservas.push(reserva);
           reserva = new Reserva();
         });
       },error=>{
         console.log("error al recuperar la informacion")
       }
     )
   }

    //Filtros Para Servicios
  ubicacionServicio:string="";
  buscarServicioPorUbicacion(){
    this.servicios= new Array<Servicio>();
    this.servicioService.getServicioPorUbicacion(this.ubicacionServicio).subscribe(
      res=>{
        let servicio=new Servicio();
        res.forEach((element: any) => {
          Object.assign(servicio, element);
          this.servicios.push(servicio);
          servicio = new Servicio();
        });
      },error=>{
        console.log("error al recuperar la informacion")
      }
    );
  }

  categoriaServicio:string="";
  buscarServicioCategoria(){
    this.servicios= new Array<Servicio>();
    this.servicioService.getServicioPorCategoria(this.categoriaServicio).subscribe(
      res=>{
        let servicio=new Servicio();
        res.forEach((element: any) => {
          Object.assign(servicio, element);
          this.servicios.push(servicio);
          servicio = new Servicio();
        });
      },error=>{
        console.log("error al recuperar la informacion")
      }
    );
  }

  gesServicio!:string;
  buscarServicioGestor(){
    this.servicios= new Array<Servicio>();
    this.servicioService.getServicioPorGestor(this.gesServicio).subscribe(
      res=>{
        let servicio=new Servicio();
        res.forEach((element: any) => {
          Object.assign(servicio, element);
          this.servicios.push(servicio);
          servicio = new Servicio();
        });
        console.log(this.servicios);
      },error=>{
        console.log("error al recuperar la informacion")
      }
    );
    this.gesServicio="";
  }


  nombreServicio!:string;
  buscarServicioPorNombre(){
    this.servicios= new Array<Servicio>();
    this.servicioService.getServicioPorNombre(this.nombreServicio).subscribe(
      res=>{
        let servicio=new Servicio();
        res.forEach((element: any) => {
          Object.assign(servicio, element);
          this.servicios.push(servicio);
          servicio = new Servicio();
        });
        console.log(this.servicios);
      },error=>{
        console.log("error al recuperar la informacion")
      }
    );
    this.nombreServicio="";
  }


//Filtros para Resenias

resServicio!:string;
buscarReseniasPorServicio(){
  this.resenias= new Array<Resenia>();
  this.reseniaService.getReseniaPorServicio(this.resServicio).subscribe(
    res=>{
      let resenia=new Resenia();
      res.forEach((element: any) => {
        Object.assign(resenia, element);
        this.resenias.push(resenia);
        resenia = new Resenia();
      });
    },error=>{
      console.log("error al recuperar la informacion")
    }
  );
}

reseniaUser!:string;
buscarReseniasPorUsuario(){
  this.resenias= new Array<Resenia>();
  this.reseniaService.getReseniaPorUsuario(this.reseniaUser).subscribe(
    res=>{
      let resenia=new Resenia();
      res.forEach((element: any) => {
        Object.assign(resenia, element);
        this.resenias.push(resenia);
        resenia = new Resenia();
      });
    },error=>{
      console.log("error al recuperar la informacion")
    }
  );
}

reseniaValoracion!:string;
buscarReseniasPorValoracion(){
  this.resenias= new Array<Resenia>();
  this.reseniaService.getReseniaPorValoracion(this.reseniaValoracion).subscribe(
    res=>{
      let resenia=new Resenia();
      res.forEach((element: any) => {
        Object.assign(resenia, element);
        this.resenias.push(resenia);
        resenia = new Resenia();
      });
    },error=>{
      console.log("error al recuperar la informacion")
    }
  );
}

}
