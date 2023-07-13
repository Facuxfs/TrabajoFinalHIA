import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Gestor } from 'src/app/models/gestor';
import { GestorService } from 'src/app/services/gestor.service';

@Component({
  selector: 'app-gestor-form',
  templateUrl: './gestor-form.component.html',
  styleUrls: ['./gestor-form.component.css']
})
export class GestorFormComponent implements OnInit {

  gestor!: Gestor;
  accion:string="";
  tipo!:any;
  constructor(private gestorService: GestorService,private activatedRoute: ActivatedRoute, private router: Router,private toast:ToastrService, private route: ActivatedRoute) {
    this.gestor = new Gestor();

  }

  ngOnInit(): void {
    this.tipo=sessionStorage.getItem('tipo');
    this.activatedRoute.params.subscribe(params=>{
      if (params['id']=="0"){
        this.accion = "new";
      }else{
        this.accion="update";
        this.cargarGestor(params['id']);
      }
    })
  }

  cargarGestor(idGestor:string){
    this.gestorService.getGestor(idGestor).subscribe(
      result=>{
        console.log(result)
        Object.assign(this.gestor,result);
      },
      error=>{
      }
    );
  }

  modificarGestor(){
    this.gestorService.putGestor(this.gestor).subscribe(
      (result: any) => {
        if (result.status == 1){
          this.toast.success('Gestor modificado');
          if(this.tipo=="admin"){
            this.router.navigate(["admin"])
          }else{
            this.router.navigate(["gestor/gestor-datos"]);
          }
        }
  },
      error => {
        this.toast.error('Error al modificar gestor');
      }
    )
  }

  /**
   * Guarda un Gestor en la BDD
   * @param gestorForm
   */
  guardarGestor(gestorForm: NgForm): void {
    this.gestor.calcularEdad();

    this.gestorService.postGestor(this.gestor)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.toast.success('Gestor' + this.gestor.nombre + this.gestor.apellido +  'registrado correctamente' );
          this.router.navigate(['/login']);
        },
        err => {
          console.log(err);
          this.toast.error('No se pudo completar el regristro');
        }
      )
  }

  volverAlInicio(): void {
    this.router.navigate(['./home']);
  }
}
