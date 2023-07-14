import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  private url:string = 'http://localhost:3000/api/correo/envio';  //para enviar emails 
  private urlbase:string="https://apis.datos.gob.ar/georef/api/";
  private unsplashAPIUrl = 'https://api.unsplash.com/search/photos';
  private clientId = 'CJe4BgW0MOqbqWmQPvsiasULEaHgAom_z9x4DJmDOl0'; // Cliente ID FacundoRomero Unsplash API
  private apiGoogle = 'AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik&callback' ; // Cliente random API Google

  constructor(private _http: HttpClient) { }

  
  public getProvincias(nombre:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
     
      params: new HttpParams()
    }
     return this._http.get(this.urlbase+"provincias?nombre="+nombre,httpOptions);  
  }

  public getLocalidades(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
     
      params: new HttpParams()
    }
     return this._http.get(this.urlbase+"municipios?provincia="+id+"&campos=id,nombre&max=100",httpOptions);  
  }

//utilizo la api de Unsplash API
  buscarImagenPorPalabraClave(palabraClave: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams().set('query',palabraClave).set('per_page', '8').set('client_id', this.clientId)
    };
    return this._http.get(this.unsplashAPIUrl, httpOptions);
  }

  public getClima(lat:string,long:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        //llave RomeroFacundo API : climate data
        'X-RapidAPI-Key': '68dfdb585dmsh2334165dcb7887ap1d34fajsn85ca59e6a478',
        'X-RapidAPI-Host': 'climate-data.p.rapidapi.com'
      }),
     
      params: new HttpParams().set('LAT', lat).set('LON', long).set('LANG','es')
    }
     return this._http.get("https://climate-data.p.rapidapi.com/api/getclimatedata",httpOptions);  
  }
 
// servicio para enviar emails
  enviarCorreo(email: string, asunto: string, mensaje: string) {
   // const url = 'http://localhost:3000/api/correo/envio';
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('asunto', asunto);
    body.set('mensaje', mensaje);
  
    return this._http.post(this.url, body.toString(), { headers: headers });
  }
  
  public getLocalidadesPorProvincia(provincia:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
     
      params: new HttpParams().append("provincia",provincia).append("max",100)
    }
     return this._http.get(this.urlbase+"municipios",httpOptions);  
  }

}

