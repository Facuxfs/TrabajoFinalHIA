import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { Resenia } from 'src/app/models/resenia';
import { ReseniaService } from 'src/app/services/resenia.service';

@Component({
  selector: 'app-resenia-servicio',
  templateUrl: './resenia-servicio.component.html',
  styleUrls: ['./resenia-servicio.component.css']
})
export class ReseniaServicioComponent implements OnInit {
  
  resenia!: Resenia;
  resenias!: Array<Resenia>;
  id:string="";
  tipo:any;
  //idServicio!:any;
  constructor(private reseniaService: ReseniaService, private toastr:ToastrService,
    private appCom:AppComponent, private router: Router,
    private route: ActivatedRoute) {
      this.appCom.logeado=true;
    this.resenias = new Array<Resenia>();
    this.resenia = new Resenia();  
  }

  ngOnInit(): void {
    this.tipo=sessionStorage.getItem("tipo");
   this.route.params.subscribe(params => {
       this.id = params['servicio'];
       this.obtenerReseniaServ(this.id);
    });
  }
  ////////////
 /* cargar( ) {//produ:NgForm){
    this.router.navigate(['reseniaForm',0]);
  }*/
  //// para mostrar por servicio
  //txt="649718107225d20a45afe1b3";//!:string; 
  //idServicio:;
  obtenerReseniaServ(id: string) {
    this.reseniaService.getReseniaServicio(id).subscribe(
      result => {
        this.resenias = new Array<Resenia>();
        result.forEach((element: any) => {
          this.resenia = new Resenia();
          Object.assign(this.resenia, element);
          this.resenias.push(this.resenia);
        });
        this.toastr.success('mis resenias');
      },
      error => {
        this.toastr.error('no se pueden obtener resenias del backend');
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
          
        }
    )
  }
  upDate(){
    location.reload();
  }
}

