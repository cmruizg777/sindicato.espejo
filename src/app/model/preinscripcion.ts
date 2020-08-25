export class Preinscripcion{
  mensajes = [
    'Debe ingresar sus nombres',
    'Debe ingresar sus apellidos',
    'Debe ingresar una cédula válida',
    'Debe seleccionar su estado civil',
    'Debe ingresar su edad',
    'Debe ingresar su nacionalidad',
    'Debe ingresar su instrucción.',
    'Debe ingresar su dirección.',
    'Debe ingresar la calle primaria de su dirección.',
    'Debe ingresar la calle secundaria de su dirección.',
    'Debe ingresar una referencia de su domicilio.',
    'Debe seleccionar una fecha válida',
    'Debe ingresar su lugar de nacimiento',
    'Debe ingresar un número de teléfono válido',
    'Debe ingresar un email válido',
    'Debe ingresar su tipo de sangre',
    'Debe ingresar su disponibilidad de tiempo',
    'Debe seleccionar el tipo de licencia'
  ]
  nombres: string = '';
  apellidos: string = '';
  cedula: string = '';
  estado_civil: string = '';
  edad: Number = 0;
  nacionalidad: string = '';
  instruccion: string = '';
  direccion: string = '';
  calle1: string = '';
  calle2: string= '';
  referencia: string= '';
  fechaNaciemiento: string= '';
  lugarNaciemiento: string= '';
  telefono: string= '';
  correo: string= '';
  tipoSangre: string= '';
  tipoLicencia: string= '';
  disponibilidad: string= '';

  errorNombres(){
    alert(this.mensajes[0]);
  }
  errorApellidos(){
    alert(this.mensajes[1]);
  }
  errorCedula(){
    alert(this.mensajes[2]);
  }
  estadoCivil(){
    alert(this.mensajes[3]);
  }
  errorEdad(){
    alert(this.mensajes[4]);
  }
  errorDireccion(){
    alert(this.mensajes[5]);
  }
  errorCalle1(){
    alert(this.mensajes[6]);
  }
  errorCalle2(){
    alert(this.mensajes[7]);
  }
  errorReferencia(){
    alert(this.mensajes[8]);
  }
  errorFecha(){
    alert(this.mensajes[9]);
  }
  errorLugarNac(){
    alert(this.mensajes[10]);
  }
  errorTelefono(){
    alert(this.mensajes[11]);
  }
  errorCorreo(){
    alert(this.mensajes[12]);
  }
  errorDisponibilidad(){
    alert(this.mensajes[13]);
  }
  errorTipoSnagre(){
    alert(this.mensajes[14]);
  }
  errorTipoLicencia(){
    alert(this.mensajes[15]);
  }
}
