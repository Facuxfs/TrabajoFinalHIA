import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  hostBD: string;
  constructor(private http: HttpClient) {
    this.hostBD = 'http://localhost:3000/api/usuario';
  }

  public getusuarios(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {

        }
      )
    }

    return this.http.get(this.hostBD, httpOptions);
  }

  public getusuario(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {

        }
      )
    }

    return this.http.get(this.hostBD + "/" + id, httpOptions);
  }
  getRepeatUsername(usuario:Usuario): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {
          "Content-type": "application/json"
        }
      )

    }
    let body = JSON.stringify(usuario);
    return this.http.post(this.hostBD + "/username",body, httpOptions);
  }
  guardarUsuario(usuario: Usuario): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      })
    }
    let body = JSON.stringify(usuario);
    return this.http.post(this.hostBD, body, httpOptions);
  }


  actualizarUsuario(usuario: Usuario): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
    }
    let body = JSON.stringify(usuario);
    return this.http.put(this.hostBD + "/" + usuario._id, body, httpOptions);
  }

  deleteUsuario(_id: string): Observable<any> {
    const httOptions = {
      headers: new HttpHeaders({

      }),

      params: new HttpParams()
        .append('_id', _id)
    }
    return this.http.delete(this.hostBD + "/" + _id, httOptions);
  }

  findEmail(email: string) {

    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json'
        }
      ),
    }
    let body = { email: email }
    return this.http.post(this.hostBD + "/email", body, httpOptions);
    /*.pipe(
      map((res: any) => {
        return res;
      }),
      catchError((error: any) => {
        console.error('Error en la solicitud:', error);
        return of(null);
      }),
      finalize(() => {
        // Realizar cualquier acción de finalización necesaria
      })
    );*/
  }

  getUsuarioPorUsername(username: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {

        }
      ), params: new HttpParams().append('username', username)

    }
    return this.http.get(this.hostBD + "/", httpOptions);
  }

  getUsuarioPorEmail(email: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {

        }
      ), params: new HttpParams().append('email', email)

    }
    return this.http.get(this.hostBD + "/", httpOptions);
  }

  getUsuarioPorDni(dni: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(
        {

        }
      ), params: new HttpParams().append('dni', dni)

    }
    return this.http.get(this.hostBD + "/", httpOptions);
  }
}
