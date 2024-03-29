import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
//Importamos el servicio de Auth
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userInfo = {
    company:'',
    projectName:''
  };

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.userInfo.company = this.activatedRoute.snapshot.params.company;
    this.userInfo.projectName = this.activatedRoute.snapshot.params.projectName;
    localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
    console.log(this.userInfo);// OUTPUT 1534
  }

  //Navegaciones
  inicioNav(){
    this.router.navigate(['./'], {relativeTo: this.activatedRoute});
  }

  registroNav(){
    this.router.navigate(['./RegistroDeProblemas'], {relativeTo: this.activatedRoute});
  }

  busquedaNav(){
    this.router.navigate(['./BusquedaDeProblemas'], {relativeTo: this.activatedRoute});
  }

  reporteNav(){
    this.router.navigate(['./ReporteGeneral'], {relativeTo: this.activatedRoute});
  }

  administracionNav(){
    this.router.navigate(['./AdministracionDelEdificio'], {relativeTo: this.activatedRoute});
  }

  async logout(){
    await this.authService.logOut().then(res=> console.log('Saliste con éxito'));
    console.log(this.authService.signedIn);
    this.router.navigate(['/']);
  }

}
