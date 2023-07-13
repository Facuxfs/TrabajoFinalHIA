import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
//import { Console, error } from 'console';
import { AppComponent } from 'src/app/app.component';
import { Reserva } from 'src/app/models/reserva';
import { Servicio } from 'src/app/models/servicio';
import { Usuario } from 'src/app/models/usuario.model';
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


  constructor(private reservaService: ReservaService, 
    private appcomponent: AppComponent,
    private router: Router,
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

  calcularPrecioRestaurante(cantidad: number) {
    this.precioCalculado = cantidad * 1500;
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
  }

  guardarReserva() {
    this.reservaService.crearReserva(this.reserva).subscribe(
      res => {
        if (res.status == 1) {
          console.log("reserva guardada");
          alert(res.msg);
          this.reserva = new Reserva();
          this.router.navigate(["usuario"]);
         
        }
      }, error => {
        alert(error.msg);
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
      },
      error => {
        console.log(error.msg);
      }
    )
  }

  volver(){
    this.router.navigate(["usuario"]);
  }

  onFileSelected(event: any) {
    const files = event.target.files[0];
    if (files.size > 80000) {//limite de tamaño de imagen
      alert('El tamaño  de imagen maximo es 80 KB');
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

