import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from '../app/inicio/inicio.component'
import { TurneroComponent } from './turnero/turnero.component';
import { RequisitosComponent } from './requisitos/requisitos.component';
import { MediosInstitucionalesComponent } from './medios-institucionales/medios-institucionales.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';


const routes: Routes = [
  {path: 'inicio', component: InicioComponent },
  {path: 'inscripciones', component: InscripcionesComponent },
  {path: 'turnero', component: TurneroComponent },
  {path: 'requisitos', component: RequisitosComponent },
  {path: 'medios', component: MediosInstitucionalesComponent },
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
