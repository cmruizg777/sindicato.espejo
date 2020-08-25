import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerTurnosInfo(fecha: string){
    const fechaObj = new Date(fecha);
    const url = `http://186.4.154.145:8080/sindicato-api/public/index.php/api/info/turnos?_fecha=${fecha}`;
    //const url = `http://localhost:8000/api/info/turnos?_fecha=${fecha}`;
    return this.http.get(url);
  }
  obtenerSocioInfo(cedula: string){
    const url = `http://186.4.154.145:8080/sindicato-api/public/index.php/api/info/socio?_cedula=${cedula}`;
    //const url = `http://localhost:8000/api/info/socio?_cedula=${cedula}`;
    return this.http.get(url);
  }
  postFile(formData) {
    const url = `http://186.4.154.145:8080/sindicato-api/public/index.php/api/info/solicitud`;
    //const url = `http://localhost:8000/api/info/solicitud`;
    return this.http.post(url, formData);
  }
  postFileInscripcion(formData) {
    const url = `http://186.4.154.145:8080/sindicato-api/public/index.php/api/info/inscripcion`;
    //const url = `http://localhost:8000/api/info/solicitud`;
    return this.http.post(url, formData);
  }
  obtenerFecha(){
    const url = `http://186.4.154.145:8080/sindicato-api/public/index.php/api/info/date`;
    //const url = `http://localhost:8000/api/info/date`;
    return this.http.get(url);
  }
}
