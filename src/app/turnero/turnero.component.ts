import { Component, OnInit } from '@angular/core';
import { ValidadorService} from '../services/validador.service'
import { TurnosService} from '../services/turnos.service'
import { ResponseTurnos } from '../model/response'

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
  selector: 'app-turnero',
  templateUrl: './turnero.component.html',
  styleUrls: ['./turnero.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class TurneroComponent implements OnInit {
  fecha ;
  fechaReference ;
  cedula: string = '';
  nombre:string = '';
  apellido:string = '';
  email:string = '';
  telf:string = '';
  direccion:string = '';
  horario: string = '' ;
  comprobante = null;
  horarios: any[];
  formaPago = 'TB';
  display1='hidden';
  display2='';
  start: Date;
  cedulaValida = false;
  mensajes = [
    'Debe seleccionar una fecha válida',
    'Debe ingresar una cédula válida',
    'Debe ingresar su nombre',
    'Debe ingresar su apellido',
    'Debe ingresar un email válido',
    'Debe ingresar su dirección',
    'Debe seleccionar una forma de pago',
    'Debe seleccionar un horario para agendar su turno',
    'Debe ingresar un teléfono válido',
  ]
  constructor(
    private validadorService: ValidadorService,
    private turnosService: TurnosService,
    private router: Router
  ) { }
  ngOnInit(): void {
    const fechaAux =  new Date();
    const anio = (fechaAux.getFullYear()).toString();
    const mes = fechaAux.getMonth() < 9 ? '0' + (fechaAux.getMonth() + 1).toString():(fechaAux.getMonth() + 1).toString();
    const dia = fechaAux.getDate() < 10 ? '0' + fechaAux.getDate().toString(): fechaAux.getDate().toString();
    //this.fecha = anio+"-"+mes+"-"+dia;
    this.fecha = moment();
    this.start = new Date();
    const obs  =this.turnosService.obtenerFecha().subscribe( (resp : ResponseTurnos) => {
      if(!resp.error){
        this.fechaReference = resp.data;
        this.fecha = moment(resp.data, 'YYYY-MM-DD');
        //console.log(this.fecha.format().split("T")[0])
      }
      this.turnosService.obtenerTurnosInfo(this.fecha.format()).subscribe((response: ResponseTurnos)=>{
        if(!response.error){
          if(response.code == 200){
            this.horarios = response.data;
          }
        }
      });
    });

  }
  validarCedula(){
    if(this.cedula){
      if(this.cedula.trim().length == 10){
        const resp  = this.validadorService.validarCedula(this.cedula);
        this.cedulaValida = resp;
      }else{
        this.cedulaValida = false;
      }
    }
    if(!this.cedulaValida){
      alert('Cédula no válida')
    }
  }
  turnosInfo(){
    const f1 = new Date(this.fecha.format());
      const f2 = new Date(this.fechaReference);
      if(f1 < f2){
        this.fecha = moment(this.fechaReference);
        alert('Fecha no válida');
        console.log('no valida');
      }else{
        console.log('valida');
        this.turnosService.obtenerTurnosInfo(this.fecha.format()).subscribe((response: ResponseTurnos)=>{
          console.log(response);
          if(!response.error){
            if(response.code == 200){
              this.horarios = response.data;
            }
          }else{
            alert('No se ha podido obtener respuestas del servidor, inténtelo más tarde.')
          }
        });
      }
  }
  setFPago(){
    if(this.formaPago === 'PP'){
      this.display1='hidden';
      this.display2='';
    }
    if(this.formaPago === 'TB'){
      this.display1='';
      this.display2='hidden';
    }
  }
  enviar(){
    const rCode = this.validarDatos();
    if(rCode == 9){
      const formData: FormData = new FormData();
      formData.append('_fecha',this.fecha.format());
      formData.append('_hora',this.horario);
      formData.append('_cedula',this.cedula);
      formData.append('_nombre',this.nombre);
      formData.append('_apellido',this.apellido);
      formData.append('_email',this.email);
      formData.append('_direccion',this.direccion);
      formData.append('_fpago',this.formaPago);
      formData.append('_telf',this.telf);


      if (this.formaPago == 'TB'){
        if(this.comprobante){
          formData.append('_comprobante', this.comprobante, this.comprobante.name);
          this.enviarFormulario(formData);
        }else{
          this.turnosService.obtenerSocioInfo(this.cedula).subscribe( (r: any) => {
            if(r.data){
              this.enviarFormulario(formData);
            }else{
              alert('Es necesario que cargue su comprobante de pago');
            }
          })
        }
      }else{
        this.enviarFormulario(formData);
      }
    }else{
      alert(this.mensajes[rCode]);
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

  handleFileInput(files: FileList) {
    this.comprobante = files.item(0);
  }

  validarDatos(): number{
    if(!this.fecha){
      return 0;
    }else{
      const f1 = new Date(this.fecha.format());
      const f2 = new Date(this.fechaReference);
      if(f1 < f2){
        this.fecha = moment(this.fechaReference);
        return 0;
      }
    }
    if(!this.cedulaValida){
      return 1;
    }
    if(this.nombre.trim() === ''){
      return 2;
    }
    if(this.apellido.trim() === ''){
      return 3;
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(this.email).toLowerCase())){
      return 4;
    }
    if(this.direccion.trim() === ''){
      return 5;
    }
    if(this.formaPago.trim() === ''){
      return 6;
    }
    if(this.horario.trim() === ''){
      return 7;
    }
    if(this.telf.trim() == ''){
      return 8;
    }
    return 9;
  }
}
