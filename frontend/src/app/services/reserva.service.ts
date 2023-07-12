import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  urlBase: string = "http://34.196.160.19:3000/api/";

  constructor(private _http:HttpClient) { }

  getReservas(): Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      ),params: new HttpParams()
    }
    return this._http.get(this.urlBase+"reserva",httpOptions);
  }
  //devuelve todas las reservas de un usuario
  getReservaUsuario(id:string) : Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      ),params: new HttpParams().append("id",id)

    }
    console.log(id);
    return this._http.get("http://34.196.160.19:3000/api/reserva/usuario?usuario="+id,httpOptions);
  }



  getReservaUsuarioAndReservado(usuario:string,reservado:boolean) : Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      ),params: new HttpParams().append("usuario",usuario).append("reservado",reservado)

    }
    return this._http.get(this.urlBase+"reserva/",httpOptions);
  }


  getReservaUsuarioAndCategoria(usuario:string,categoria:string) : Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      ),params: new HttpParams().append("usuario",usuario).append("categoria",categoria)

    }
    return this._http.get(this.urlBase+"reserva/",httpOptions);
  }

  getReservaUsuarioAndNombreDeServicio(usuario:string,nombreServicio:string) : Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      ),params: new HttpParams().append("usuario",usuario).append("nombreServicio",nombreServicio)

    }
    return this._http.get(this.urlBase+"reserva/",httpOptions);
  }

  getReservaPorServicio(servicio:string) : Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      ),params: new HttpParams().append("servicio",servicio)

    }
    return this._http.get(this.urlBase+"reserva/",httpOptions);
  }

  getReservaPorEstado(estado:boolean) : Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      ),params: new HttpParams().append("reservado",estado)

    }
    return this._http.get(this.urlBase+"reserva/",httpOptions);
  }

  getReservaPorCategoria(categoria:string) : Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      ),params: new HttpParams().append("categoria",categoria)

    }
    return this._http.get(this.urlBase+"reserva/",httpOptions);
  }

  crearReserva(reserva:Reserva) : Observable<any>{
    const httpOptions = {
       headers : new HttpHeaders(
        {
          "Content-Type": "application/json"
        }
      ),
      params:new HttpParams()
    }
    const body= JSON.stringify(reserva);
    return this._http.post(this.urlBase+"reserva/",body, httpOptions);
  }


  getReserva(_id:string) : Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      ),params: new HttpParams()
    }
    return this._http.get(this.urlBase+"reserva/"+_id,httpOptions);
  }

  modificarReserva(reserva:Reserva):Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders(
       {
         "Content-Type": "application/json"
       }
     ),
     params:new HttpParams()
   }
   let body= JSON.stringify(reserva);
   return this._http.put(this.urlBase+"reserva/"+reserva._id,body, httpOptions);
  }

  deleteReserva(_id:string):Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      ),params: new HttpParams()
    }

    return this._http.delete(this.urlBase+"reserva/"+_id,httpOptions);
  }

}
