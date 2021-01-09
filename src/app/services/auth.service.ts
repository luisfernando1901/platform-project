import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signedIn: boolean = false;
  constructor(private angularFireAuth: AngularFireAuth) { }

  async signIn(email: string, password: string) {
    await this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.signedIn = true;
        //Guardamos el usuario en el local storage
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.signedIn = false;
      });
  }

  async logOut() {
    await this.angularFireAuth.signOut();
    this.signedIn = false;
    localStorage.removeItem('user');
    localStorage.clear();
  }
}
