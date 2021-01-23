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

  async addProblem(company:string,project:string,code:string,code_problem:string,form:any){
    //Donde dice 'CON' debe ser el nombre dinámico asignado por el form seleccionado, y el doc que se escribe debe ser dinámico al número de registro que le toca de acuerdo
    //al grupo
    await this.angularFirestore.collection("Companies").doc(company).collection(project).doc('registro de problemas').collection(code).doc(code_problem).set(form);
    console.log('Problema registrado exitosamente!');
  }
  //Devuelve el objeto de cantidad de problemas registrado por "origen del problema" (DIS,CON y OyM)
  calculateIndex(company:string,project:string){
    return this.angularFirestore.collection("Companies").doc(company).collection(project).doc('registro de problemas').valueChanges();
  }

  async updateProblemAmount(company:string,project:string,updateFieldObj:object){
    await this.angularFirestore.collection("Companies").doc(company).collection(project).doc('registro de problemas').update(updateFieldObj);
  }

}
