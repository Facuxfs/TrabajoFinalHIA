import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gestor } from '../models/gestor';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GestorService {

  urlBase: string = "http://localhost:3000/api/";

  constructor(private httpClient: HttpClient) {

  }

  getGestores(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({

      }),

      params: new HttpParams()
    }

    return this.httpClient.get(this.urlBase + "gestor/", httpOption);
  }

  getGestor(_id: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
         
      }),
    }

    return this.httpClient.get(this.urlBase + "gestor/" + _id, httpOption);
  }

  postGestor(gestor: Gestor): Observable<any> {
    const httOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),

      params: new HttpParams()
    }

    let body = JSON.stringify(gestor);

    return this.httpClient.post(this.urlBase + "gestor/", body, httOptions);
  }

  putGestor(gestor: Gestor): Observable<any> {
    const httOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),

      params: new HttpParams()
    }

    let body = JSON.stringify(gestor);

    return this.httpClient.put(this.urlBase + "gestor/" + gestor._id, body, httOptions);
  }

  deleteGestor(_id: string): Observable<any> {
    const token=sessionStorage.getItem("token")
    const tipo = sessionStorage.getItem("tipo")
     console.log("tipo: "+tipo+ "   token: "+token)
    const httOptions = {
      headers: new HttpHeaders({

      }),

      params: new HttpParams()
        .append('_id', _id)
    }

    return this.httpClient.delete(this.urlBase + "gestor/" + _id, httOptions);
  }

  //Filtros de Gestor

  getGestorPorUsername(username: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({

      }),

      params: new HttpParams()
        .append('username', username)
    }

    return this.httpClient.get(this.urlBase + "gestor/", httpOption);
  }

  getGestorPorEmail(email: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({

      }),

      params: new HttpParams()
        .append('email',email)
    }

    return this.httpClient.get(this.urlBase + "gestor/", httpOption);
  }

  getGestorPorDni(dni: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({

      }),

      params: new HttpParams()
        .append('dni',dni)
    }

    return this.httpClient.get(this.urlBase + "gestor/", httpOption);
  }


}
