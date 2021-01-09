import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  empresa: string;
  constructor(private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }

  async login(email: string, password: string) {
    //Utilizo el await para que espere a que todo lo del servicio se haga y cambie el estado de "signedIn".
    await this.authService.signIn(email, password);
    console.log(this.authService.signedIn);
    if (this.authService.signedIn == true)
      this.router.navigate(['/project']);

  }

}
