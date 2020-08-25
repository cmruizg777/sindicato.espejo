import { Injectable } from '@angular/core';
import { isNumber } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ValidadorService {

  constructor() { }

  validarCedula(cedula: string): boolean{
    const tam = cedula.length;
    if(tam!==10){
      return false;
    }
    if(isNaN(Number(cedula))){
      return false;
    }
    const codigoProvincia = Number(cedula.substr(0,2));
    const digitoMenorA6 = Number(cedula.substr(2,1));
    const secuencia = (cedula.substr(3,1));
    const digitoVerificador = Number(cedula.substr(9,1));
    if(codigoProvincia<0 || codigoProvincia > 24){
      return false;
    }
    if(digitoMenorA6>=6){
      return false;
    }
    const arrayCoeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    const arrayDeDigitos: string[] = cedula.split("");
    let suma = 0;

    arrayDeDigitos.forEach((value, index)=>{
      if(index < 9){
        const digito = Number(value);
        const producto = digito*arrayCoeficientes[index] < 10 ? digito*arrayCoeficientes[index]: digito*arrayCoeficientes[index]-9;
        suma += producto;
      }
    });
    let decenaSuperior;
    if(suma%10>0){
      decenaSuperior = (Math.trunc(suma/10) + 1) * 10;
    }else{
      decenaSuperior = suma;
    }

    const resultado = decenaSuperior - suma ;

    if(resultado == digitoVerificador){
      return true ;
    }
    return false;
  }
}
