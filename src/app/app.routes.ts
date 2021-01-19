import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdministracionComponent } from './components/home/homeMenu/administracion/administracion.component';
import { BusquedaComponent } from './components/home/homeMenu/busqueda/busqueda.component';
import { InicioComponent } from './components/home/homeMenu/inicio/inicio.component';
import { RegistroComponent } from './components/home/homeMenu/registro/registro.component';
import { ReporteComponent } from './components/home/homeMenu/reporte/reporte.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectSelectorComponent } from './components/project-selector/project-selector.component';

const routes = [
    { path: '', component: LoginComponent },
    { path: 'projects', component: ProjectSelectorComponent },
    { path: 'home/:projectName', component: HomeComponent,
        children:[
            { path: '', component: InicioComponent },
            { path: 'RegistroDeProblemas', component: RegistroComponent },
            { path: 'BusquedaDeProblemas', component: BusquedaComponent },
            { path: 'ReporteGeneral', component: ReporteComponent },
            { path: 'AdministracionDelEdificio', component: AdministracionComponent },
        ]},
];

export const routing = RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' });