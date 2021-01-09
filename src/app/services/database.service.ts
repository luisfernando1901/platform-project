import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  storageObj:any = {};
  userEmail:string;

  constructor(private angularFirestore: AngularFirestore) { }

  identifyCompany(){
    this.storageObj = JSON.parse(localStorage.getItem('user')); //Tenemos que parsear el string que devuelve el localstorage
    console.log('Los datos del usuario son:');
    this.userEmail = this.storageObj.user.email; //Aqui ta tenemos el user mail, por lo que podemos buscar la compañía a la que pertenece
    //console.log(this.userEmail); 
    //Asi debo usar para hacer consultas en la colección de datos en firestore 
    return this.angularFirestore.collection("company-access-members",ref => ref.where("members","array-contains",this.userEmail)).valueChanges();
  }

  identifyProjects(){
    return this.angularFirestore.collection("Companies");
  }

}
