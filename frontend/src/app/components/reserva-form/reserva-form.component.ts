import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import { Console, error } from 'console';
import { AppComponent } from 'src/app/app.component';
import { Gestor } from 'src/app/models/gestor';
import { Reserva } from 'src/app/models/reserva';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario.model';
import { CiudadesService } from 'src/app/services/ciudades.service';
import { GestorService } from 'src/app/services/gestor.service';
import { ReservaService } from 'src/app/services/reserva.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-reserva-form',
  templateUrl: './reserva-form.component.html',
  styleUrls: ['./reserva-form.component.css']
})
export class ReservaFormComponent implements OnInit {
  usuario!: Usuario;
  reserva!: Reserva;
  accion!: string;
  id!: any;
  servicio!: any;
  servicioSeleccionado!: Servicio;
  servicios!: Array<Servicio>;
  nombreServicio!: string;
  precioCalculado!: number;
  gestor!:Gestor;

  constructor(private reservaService: ReservaService,  private gestorService:GestorService,
    private appcomponent: AppComponent, private email:CiudadesService,
    private router: Router, private toastrService:ToastrService,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private serviceServicio: ServiciosService) {
    //capturando id del usuario en sesion
    this.id = sessionStorage.getItem('userId');
    appcomponent.logeado = true;
    this.reserva = new Reserva();
    this.usuario = new Usuario();
    this.cargarUsuario();
    this.reserva.fechaAlta = new Date().toISOString();
    this.reserva.numeroReserva = this.usuario.reservas.length + 1;
   
  }

cargarGestor(){
  this.gestor = new Gestor();
  this.gestorService.getGestor(this.servicioSeleccionado.gestor).subscribe(
    result => {
      console.log(result)
      Object.assign(this.gestor, result);
    },
    error => {
    }
  );
}

  calcularPrecioRestaurante(cantidad: number) {
    const precioComida:number = 3000;
    this.precioCalculado = cantidad * precioComida;
    this.reserva.precio = this.precioCalculado;
  }

  calcularPrecioHotel(cantidad: number) {
    const PrecioHotel:number = 4000;
    this.precioCalculado = cantidad * PrecioHotel ;
    this.reserva.precio = this.precioCalculado;
  }

  ngOnInit(): void {
    this.id = sessionStorage.getItem("userId");
    this.reserva.usuario = this.id as string;
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
        this.activatedRoute.paramMap.subscribe(params => {
        const idServicio = params.get('idServicio');
        this.reserva.servicio = idServicio as string;
        this.cargarDatosDelServicio(idServicio as string);
          //Aquí puedes usar el valor de idServicio como desees
        });
      } else {
        //modificacion

        this.accion="update";
        const idReserva= params['id'];
        const idServicio = params['idServicio'];
        console.log(idServicio,"id",idReserva,"idServicio");
        
        this.cargarDatosDelServicio(idServicio as string);
        this.cargarReserva(idReserva as string);
      }
    })
   
  }


  cargarDatosDelServicio(_id: string) {
    this.serviceServicio.getServicio(_id).subscribe(
      result => {
        console.log(result)
        this.servicioSeleccionado = new Servicio();
        Object.assign(this.servicioSeleccionado, result);
        this.reserva.categoria = this.servicioSeleccionado.categoria;

        this.reserva.nombreServicio = this.servicioSeleccionado.nombre;

        this.nombreServicio = this.servicioSeleccionado.nombre;
      },
      error => {
      }
    );
  }


  cargarUsuario() {
    this.usuarioService.getusuario(this.id).subscribe(
      (res: any) => {
        Object.assign(this.usuario, res);
      }
    )
  }

  pagarReserva(){
    this.reserva.reservado = false;
    this.cargarGestor();
  }

  guardarReserva() {
    this.reservaService.crearReserva(this.reserva).subscribe(
      res => {
        if (res.status == 1) {
          console.log("reserva guardada");
          this.toastrService.success('Reserva registrada');
          this.router.navigate(["usuario"]);
          let asunto:string="Alerta : nueva reserva en " +this.reserva.nombreServicio+" solicitada ";
          let mensaje:string = "Tiene una nueva solicitud de reserva para el :" + this.reserva.fechaIngreso + "a nombre de " +this.usuario.nombre +this.usuario.apellido + " ingrese al sistema de Turismo para poder ver la solicitud completa" ;
          this.email.enviarCorreo(this.gestor.email,asunto,mensaje).subscribe(res=>{
            this.toastrService.success("Reserva para :"+this.reserva.nombreServicio,"Email enviado")
          })
          this.reserva = new Reserva();
        }
      }, error => {
        alert(error.msg);
        this.toastrService.error("No se pudo enviar la reserva")
      }
    )
  }
//Validar Fechas
  getTodayDateString(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Los meses en JavaScript comienzan en 0
    const day = today.getDate();

    // Formatear la fecha en el formato YYYY-MM-DD
    return `${year}-${this.padNumber(month)}-${this.padNumber(day)}`;
  }

  //Validar Fechas EGRESO
getTodayDateStringEgreso(fechaIngreso: string): string {
  const ingreso = new Date(fechaIngreso);
  const year = ingreso.getFullYear();
  const month = ingreso.getMonth() + 1; // Los meses en JavaScript comienzan en 0
  const day = ingreso.getDate() + 1; // Sumar un día a la fecha de ingreso

  // Formatear la fecha en el formato YYYY-MM-DD
  return `${year}-${this.padNumber(month)}-${this.padNumber(day)}`;
}

  
  private padNumber(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
  }

  

  //Carga los datos de la reserva, para la modificacion
  cargarReserva(id:string){
    this.reservaService.getReserva(id).subscribe(res=>{
      console.log(res);
      this.reserva=new Reserva();
      Object.assign(this.reserva,res);
    })
  }


  modificarReserva(){
    this.reservaService.modificarReserva(this.reserva).subscribe(
      result => {
        console.log(result);
        alert("Reserva Modificada"); 
        this.router.navigate(["usuario"]);
        this.toastrService.success('Reserva modificada!');
      },
      error => {
        this.toastrService.error('Error al modificar la reserva');
      }
    )
  }

  volver(){
    this.router.navigate(["usuario"]);
  }

  onFileSelected(event: any) {
    const files = event.target.files[0];
    if (files.size > 80000) {//limite de tamaño de imagen
      this.toastrService.error('El tamaño  de imagen maximo es 80 KB');
      event.target.value = null;
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        let base64 = reader.result as string;
       // this.resenia.imagen = base64;//almaceno en imagen el url base64
      };
      reader.readAsDataURL(files);
    }
  }

}

