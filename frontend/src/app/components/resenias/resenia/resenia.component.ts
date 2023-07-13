import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { Resenia } from 'src/app/models/resenia';
import { ReseniaService } from 'src/app/services/resenia.service';

@Component({
  selector: 'app-resenia',
  templateUrl: './resenia.component.html',
  styleUrls: ['./resenia.component.css']
})
export class ReseniaComponent implements OnInit {
  
  id: any;
  tipo: any;
  resenia!: Resenia;
  resenias!: Array<Resenia>;
  constructor(private reseniaService: ReseniaService, private toastr:ToastrService,
    private appCom:AppComponent, private router: Router) {
      this.appCom.logeado=true;
    this.resenias = new Array<Resenia>();
    this.resenia = new Resenia(); 
    this.mostrarResenias();
  }

  ngOnInit(): void {
    this.id = sessionStorage.getItem("userId");
    this.tipo = sessionStorage.getItem("tipo");
  }
  ////////////
  cargar() {//produ:NgForm){
    this.router.navigate(['reseniaForm',0]);
  }
  ////////////
  mostrarResenias() { 
    this.reseniaService.getReseniaPorUsuario(this.id).subscribe(
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
        this.toastr.error('el servidor backend no responde');
      });
  }
  ///////
  eliminar(id:string){
    this.reseniaService.delateResenia(id).subscribe(
      res=>{
          console.log(res);
          this.upDate();
          this.toastr.info('La resenia a sido eliminada' , 'Info :')
        },error=>{
          console.log(error);
        }
    )
  }
  upDate(){
    location.reload();
  }

  //// para mostrar por usuario
txt1!:string; 
  obtenerReseniasUs() {
    this.reseniaService.getReseniaUsuario(this.txt1).subscribe(
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
        this.toastr.error('el servidor backend no responde');
      } 
    );
  }
  //// para mostrar por servicio
  txt!:string; 
  obtenerReseniaServ() {
    this.reseniaService.getReseniaServicio(this.txt).subscribe(
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
        this.toastr.error('el servidor backend no responde');
      } 
    );
  }
}
