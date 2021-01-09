import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProjectSelectorComponent } from './components/project-selector/project-selector.component';

const routes = [
    { path: '', component: LoginComponent },
    { path: 'project', component: ProjectSelectorComponent },
];

export const routing = RouterModule.forRoot(routes);