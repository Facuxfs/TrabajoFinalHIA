import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-usuario-datos',
  templateUrl: './usuario-datos.component.html',
  styleUrls: ['./usuario-datos.component.css']
})
export class UsuarioDatosComponent implements OnInit {
  
  id:any;
  usuario:Usuario;
  tipo:any;
 constructor(private appCom:AppComponent,private servicioU:UsuarioService) {
   this.appCom.logeado=true;
   this.usuario=new Usuario();
  }
 ngOnInit(): void {
   this.id= sessionStorage.getItem("userId"); 
   this.tipo=sessionStorage.getItem("tipo");
   this.getUsuario();
 }

 getUsuario(){
  
     this.servicioU.getusuario(this.id)
     .subscribe(
       (res:any)=>{
         Object.assign(this.usuario,res);
        console.log(res);
       },
       err=>{
         console.log(err);
       }
     )
 }


}
