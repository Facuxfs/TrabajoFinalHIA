import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { Resenia } from 'src/app/models/resenia';
import { ReseniaService } from 'src/app/services/resenia.service';

@Component({
  selector: 'app-resenia-usuario',
  templateUrl: './resenia-usuario.component.html',
  styleUrls: ['./resenia-usuario.component.css']
})
export class ReseniaUsuarioComponent implements OnInit {
  resenia!: Resenia;
  resenias!: Array<Resenia>;
  idUs!:any;
  constructor(private reseniaService: ReseniaService,
    private appCom:AppComponent, private toastr:ToastrService,
    private router: Router) {
    this.appCom.logeado=true;
    this.resenias = new Array<Resenia>();
    this.resenia = new Resenia(); 
    this.obtenerReseniasUs();
    this.idUs=sessionStorage.getItem('userId'); 
  }

  ngOnInit(): void {
  }
  
  //// para mostrar por usuario 
  obtenerReseniasUs() { 
   this.idUs = sessionStorage.getItem('userId');
   console.log(this.idUs);

    this.reseniaService.getReseniaUsuario(this.idUs).subscribe(
      result => {
        this.resenias = new Array<Resenia>();
        result.forEach((element: any) => {
          this.resenia = new Resenia();
          Object.assign(this.resenia, element);
          this.resenias.push(this.resenia);
        });
        console.log(result);
      },
      error => {
        console.log("error")
      } 
    );
  }

  eliminar(id:string){
    this.reseniaService.delateResenia(id).subscribe(
      res=>{
          console.log(res);
          this.upDate();
          this.toastr.success('Resenia eliminada');
        },error=>{
          this.toastr.error('Error al reservar');
        }
    )
  }
  public modificar(resenia: Resenia){
    this.router.navigate(['reseniaForm', resenia._id]);
  }
  upDate(){
    location.reload();
  }
}

