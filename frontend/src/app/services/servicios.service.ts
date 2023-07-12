import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  urlBase: string = "http://localhost:3000/api/";

  constructor(private _http:HttpClient) { }

  //me devuelve los servicios que se encuentran en una localidad determinada
  getServicios(ubicacion:string): Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      ),params: new HttpParams()

    }
    return this._http.get("http://localhost:3000/api/servicio/ubicacion?ubicacion="+ubicacion,httpOptions);
  }
  
  getServicioGestor(gestor:string,categoria:string){
    const httpOptions = {
      headers: new HttpHeaders({

      }),params: new HttpParams().append("gestor",gestor).append("categoria",categoria)
    }
    return this._http.get(this.urlBase+"servicio/gestor",httpOptions);
  }

  getServicioNombre(gestor:string,nombre:string){
     const httpOptions={
      headers:new HttpHeaders({

      }), params:new HttpParams().append("gestor",gestor).append("nombre",nombre)
     }
    return this._http.get(this.urlBase+"servicio/nombre",httpOptions);
  }

  getServiciosTotal(): Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      ),params: new HttpParams()

    }
    return this._http.get("http://localhost:3000/api/servicio/",httpOptions);
  }

  getServicio(_id:string) : Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      ),params: new HttpParams().append("id",_id)
    }
    return this._http.get(this.urlBase+"servicio/"+_id,httpOptions);
  }

  crearServicio(servicio:Servicio) : Observable<any>{
    const httpOptions = {
       headers : new HttpHeaders(
        {
          "Content-Type": "application/json"
        }
      ),
      params:new HttpParams()
    }
    let body= JSON.stringify(servicio);
    return this._http.post(this.urlBase+"servicio",body, httpOptions);
  }


  modificarServicio(servicio:Servicio):Observable<any>{
    const httpOptions = {
      headers : new HttpHeaders(
       {
         "Content-Type": "application/json"
       }
     ),
     params:new HttpParams()
   }
   let body= JSON.stringify(servicio);
   return this._http.post(this.urlBase+"servicio/",body, httpOptions);
  }

  deleteServicio(id:string):Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      )
    }
    return this._http.delete(this.urlBase+"servicio/"+id,httpOptions);
  }

  getServicioPorCategoria(categoria:string) : Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      ),params: new HttpParams().append("categoria",categoria)
    }
    return this._http.get(this.urlBase+"servicio/",httpOptions);
  }

  getServicioPorGestor(gestor:string) : Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      ),params: new HttpParams().append("gestor",gestor)
    }
    return this._http.get(this.urlBase+"servicio/",httpOptions);
  }

  getServicioPorUbicacion(ubicacion:string) : Observable<any>{
    const httpOptions={
      headers:new HttpHeaders(
        {

        }
      ),params: new HttpParams().append("ubicacion",ubicacion)
    }
    return this._http.get(this.urlBase+"servicio/",httpOptions);
  }


}
