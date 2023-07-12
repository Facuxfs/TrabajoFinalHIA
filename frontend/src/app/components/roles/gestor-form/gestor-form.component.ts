import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private gestorService: GestorService,private activatedRoute: ActivatedRoute, private router: Router, private route: ActivatedRoute) {
    this.gestor = new Gestor();
  }

  ngOnInit(): void {
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
          alert(result.msg);
          this.router.navigate(["gestor/gestor-datos"])
        }
  },
      error => {
        alert(error.msg);
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

          this.router.navigate(['/login']);
        },
        err => {
          console.log(err);
        }
      )
  }

  volverAlInicio(): void {
    this.router.navigate(['./home']);
  }
}
