import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-selector',
  templateUrl: './project-selector.component.html',
  styleUrls: ['./project-selector.component.css']
})
export class ProjectSelectorComponent implements OnInit, OnDestroy {
  subscription1: Subscription;
  subscription2: Subscription;
  projects:string[] = [];
  loading:boolean = true;

  empresa:string;

  constructor(private authService:AuthService,
              private databaseService:DatabaseService,
              private router:Router) { 
                this.subscription1 = this.databaseService.identifyCompany().subscribe(params => this.identifyCompAndProj(params));

              }

  ngOnInit(): void {
  }
  ngOnDestroy(){
    this.subscription1.unsubscribe(); //Asi se eliminan las subscripciones para que no se estén efectuando en  el background cuando cambio de página
    this.subscription2.unsubscribe();
  }

  identifyCompAndProj(param:any){
    this.empresa = param[0]['company'];
    //localStorage.setItem('empresa',this.empresa);
    console.log(this.empresa);
    this.subscription2 = this.databaseService.identifyProjects().valueChanges().subscribe(projects => {
      this.projects = projects[0]['projects'];
      this.loading = !this.loading;
      console.log(this.projects);

    });
  }

  getProjectData(projectName:string){
    //console.log(projectName);
    this.router.navigate(['/home',this.empresa,projectName]);
  }

  async logout(){
    await this.authService.logOut().then(res=> console.log('Saliste con éxito'));
    console.log(this.authService.signedIn);
    this.router.navigate(['/']);
  }

}
