import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
//Importamos los módulos necesarios de Angular Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
//Importamos los servicios
import { AuthService } from './services/auth.service';
import { ProjectSelectorComponent } from './components/project-selector/project-selector.component';
//Importamos las rutas
import { routing } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Importamos los módulos de Material
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
//Es necesario incluir estas 2 para utilizar el datepicker
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


//Importamos reactive forms para poder utilizar el [formGroup]
import { ReactiveFormsModule } from '@angular/forms';
//Importamos componentes
import { HomeComponent } from './components/home/home.component';
import { InicioComponent } from './components/home/homeMenu/inicio/inicio.component';
import { RegistroComponent } from './components/home/homeMenu/registro/registro.component';
import { BusquedaComponent } from './components/home/homeMenu/busqueda/busqueda.component';
import { ReporteComponent } from './components/home/homeMenu/reporte/reporte.component';
import { AdministracionComponent } from './components/home/homeMenu/administracion/administracion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectSelectorComponent,
    HomeComponent,
    InicioComponent,
    RegistroComponent,
    BusquedaComponent,
    ReporteComponent,
    AdministracionComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    routing,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressBarModule,
    MatSelectModule,
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
