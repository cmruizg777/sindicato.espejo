import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Header2Component } from './header2/header2.component';
import { BannerComponent } from './banner/banner.component';
import { AcercadeComponent } from './acercade/acercade.component';
import { MediosInstitucionalesComponent } from './medios-institucionales/medios-institucionales.component';
import { TurneroComponent } from './turnero/turnero.component';
import { RequisitosComponent } from './requisitos/requisitos.component';
import { EscribenosComponent } from './escribenos/escribenos.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    FooterComponent,
    Header2Component,
    BannerComponent,
    AcercadeComponent,
    MediosInstitucionalesComponent,
    TurneroComponent,
    RequisitosComponent,
    EscribenosComponent,
    InscripcionesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
