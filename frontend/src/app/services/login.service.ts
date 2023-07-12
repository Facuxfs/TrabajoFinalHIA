import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  hostBD:string;
  
  constructor(private http:HttpClient) {
    this.hostBD='http://localhost:3000/api/turismo/login';
   }

   public login(username:string,password:string):Observable<any>{
      const httpOptions={
        headers:new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      let body=JSON.stringify({username:username,password:password});
       console.log(body)
      return this.http.post(this.hostBD,body,httpOptions);
   }

   public logout() {
    //borro el vble almacenado mediante el storage
    sessionStorage.removeItem("username");
    //sessionStorage.removeItem("password");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("tipo");    
    sessionStorage.removeItem("token");
    }

    public usuarioLoggedIn(){
      var resultado = false;
      var usuario = sessionStorage.getItem("tipo");
      if(usuario!=null){
       if(usuario==="gest" || usuario==="user" || usuario==="admin"){
           resultado = true;}         
      }
         return resultado;
      }

      getToken(){
        if (sessionStorage.getItem("token")!= null){
          return sessionStorage.getItem("token")!;
          }else{
          return "";
          }
      }

    public userLoggedIn(){
      var resultado = false;
      var usuario = sessionStorage.getItem("tipo");
      if(usuario!=null){
       if(usuario==="user"){
           resultado = true;
         }    
      }
         return resultado;
      }

      public gestLoggedIn(){
        var resultado = false;
        var usuario = sessionStorage.getItem("tipo");
        if(usuario!=null){
         if(usuario==="gest"){
             resultado = true;}         
        }
           return resultado;
        }
        public adminLoggedIn(){
          var resultado = false;
          var usuario = sessionStorage.getItem("tipo");
          if(usuario!=null){
           if(usuario==='admin')
               resultado = true;
           
          }
             return resultado;
          }

      public userLogged(){
        var usuario = sessionStorage.getItem("username");
        return usuario;
        }
   
        public idLogged(){
          var id = sessionStorage.getItem("userid");
          return id;
          }

}
