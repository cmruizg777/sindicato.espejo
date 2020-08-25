import { Component, OnInit, Directive, Renderer2, ElementRef } from '@angular/core';
import { ValidadorService} from '../services/validador.service'
import { TurnosService} from '../services/turnos.service'
import { ResponseTurnos } from '../model/response'
import { Preinscripcion } from './../model/preinscripcion'
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import * as _rollupMoment from 'moment';
import { Router } from '@angular/router';
import { from } from 'rxjs';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'MM YYYY',
  },
};


@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit {

  private nativeElement : Node;


  fecha ;
  fechaReference ;
  preinscripcion: Preinscripcion;
  comprobante = null;
  formaPago = 'TB';
  display2='';
  start: Date;
  cedulaValida = false;

  constructor(
    private validadorService: ValidadorService,
    private router: Router,
    private turnosService: TurnosService
    ) {
      this.preinscripcion = new Preinscripcion();
      const fechaAux =  new Date();
    //this.fecha = anio+"-"+mes+"-"+dia;
    this.fecha = moment();

    this.start = new Date();
    /*const obs  =this.turnosService.obtenerFecha().subscribe( (resp : ResponseTurnos) => {

      if(!resp.error){

        this.fechaReference = resp.data;
        this.fecha = moment(resp.data, 'YYYY-MM-DD');
        //console.log(this.fecha.format().split("T")[0])
      }
      obs.unsubscribe();
    });*/

    }

  ngOnInit(): void {
  }

  validarCedula(){
    if(this.preinscripcion.cedula){
      if(this.preinscripcion.cedula.trim().length == 10){
        const resp  = this.validadorService.validarCedula(this.preinscripcion.cedula);
        this.cedulaValida = resp;
      }else{
        this.cedulaValida = false;
      }
    }
    if(!this.cedulaValida){
      alert('Cédula no válida')
    }
  }
  handleFileInput(files: FileList) {
    this.comprobante = files.item(0);
  }

///////////////////////////////////////////////
enviar(){
  const rCode = this.validarDatos();
  if(rCode){
    const formData: FormData = new FormData();
    formData.append('_fecha',this.fecha);
    formData.append('_nombres',this.preinscripcion.nombres);
    formData.append('_apellidos',this.preinscripcion.apellidos);
    formData.append('_cedula',this.preinscripcion.cedula);
    formData.append('_email',this.preinscripcion.correo);
    formData.append('_direccion',this.preinscripcion.direccion);
    formData.append('_calle1',this.preinscripcion.calle1);
    formData.append('_calle2',this.preinscripcion.calle2);
    formData.append('_fpago',this.formaPago);
    formData.append('_telefono',this.preinscripcion.telefono);
    formData.append('_lugarN',this.preinscripcion.lugarNaciemiento);
    formData.append('_estado',this.preinscripcion.estado_civil);
    formData.append('_instruccion',this.preinscripcion.instruccion);
    formData.append('_nacionalidad',this.preinscripcion.nacionalidad);

    if (this.formaPago == 'TB'){
      if(this.comprobante){
        formData.append('_comprobante', this.comprobante, this.comprobante.name);
        this.enviarFormulario(formData);
      }else{
        this.turnosService.obtenerSocioInfo(this.preinscripcion.cedula).subscribe( (r: any) => {
          if(r.data){
            this.enviarFormulario(formData);
          }else{
            alert('Es necesario que cargue su comprobante de pago');
          }
        })
      }
    }
  }
}

enviarFormulario(formData){
  this.turnosService.postFile(formData).subscribe((data: ResponseTurnos) => {
    if(data.code==200){
      alert('Su turno se ha almacenado correctamente, por favor espere el mensaje de confirmación en su correo.');
      this.router.navigate(['inicio']);

    }else{
      alert(`Ha habido un error: ${data.data}`);
    }
  }, error => {
    alert('Ha habido un error, por favor revise su información e intentelo nuevamente.')
    console.log(error);
  });
}




  ////////////////////////////////////////


  validarDatos(): boolean {
    if(!this.fecha){
      this.preinscripcion.errorFecha();
      return false;
    }
    if(!this.cedulaValida){
      this.preinscripcion.errorCedula();
      return false;
    }
    if(this.preinscripcion.nombres.trim() === ''){
      this.preinscripcion.errorNombres();
      return false;

    }
    if(this.preinscripcion.apellidos.trim() === ''){
      this.preinscripcion.errorApellidos();
      return false;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(this.preinscripcion.correo).toLowerCase())){
      this.preinscripcion.errorCorreo();
      return false;
    }
    if(this.preinscripcion.direccion.trim() === ''){
      this.preinscripcion.errorDireccion();
      return false;
    }
    if(this.formaPago.trim() === ''){

    }
    if(this.preinscripcion.lugarNaciemiento.trim() === ''){
      this.preinscripcion.errorLugarNac();
      return false;
    }
    if(this.preinscripcion.telefono.trim() == ''){
      this.preinscripcion.errorTelefono();
      return false;
    }
    return true;
  }


}
