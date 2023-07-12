import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GestorService } from './gestor.service';
import { UsuarioService } from './usuario.service';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  urlBase: string = "http://localhost:3000/api/";


  constructor(private httpClient: HttpClient,private usuarioService:UsuarioService, private gestorService:GestorService) { 
  }

  getAdmin(_id: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({

      }),

      params: new HttpParams()
        .append('_id', _id)
    }

    return this.httpClient.get(this.urlBase + "admin/?_id=" + _id, httpOption);
  }

    deleteAdmin(_id: string): Observable<any> {
      const httOptions = {
        headers: new HttpHeaders({
        }),
        params: new HttpParams()
          .append('_id', _id)
      }
      return this.httpClient.delete(this.urlBase + "admin/" + _id, httOptions);
    }
  
    postAdministrador(admin:Admin): Observable<any> {
      const httOptions = {
        headers: new HttpHeaders({
          "Content-type": "application/json"
        }),
  
        params: new HttpParams()
      } 
  
      let body = JSON.stringify(admin);
  
      return this.httpClient.post(this.urlBase + "admin/", body, httOptions);
    }

    putAdministrador(admin: Admin): Observable<any> {
      const httOptions = {
        headers: new HttpHeaders({
          "Content-type": "application/json"
        }),
  
        params: new HttpParams()
      }
  
      let body = JSON.stringify(admin);
  
      return this.httpClient.put(this.urlBase + "admin/" + admin._id, body, httOptions);
    }
    
}
