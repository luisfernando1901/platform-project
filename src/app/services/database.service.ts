import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  storageObj:any = {};
  userEmail:string;

  constructor(private angularFirestore: AngularFirestore,
              private http:HttpClient) { }

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
  //Función utilizada en "Búsqueda de componentes"
  searchProblems(company:string,project:string,queryForm:object,tipo:string){      //Puedo enviar hasta antes de collection tipo y eso lo hago en cada if !!!! BUENAAA
    let comparatorsArray:any = ['!=','!=','!=','!=','!='];
    if (queryForm['Estado'] != "") {
      comparatorsArray[0] = '==';      
    }
    if (queryForm['Sistema'] != "") {
      comparatorsArray[1] = "==";      
    }
    if (queryForm['Impacto'] != "") {
      comparatorsArray[2] = "==";      
    }
    if (queryForm['Severidad'] != "") {
      comparatorsArray[3] = "==";      
    }
    if (queryForm['Moneda'] != "") {
      comparatorsArray[4] = "==";      
    }
    //Aqui falta agregar los search en los demás campos
    return this.angularFirestore.collection("Companies").doc(company).collection(project).doc('registro de problemas').collection(tipo, ref => ref.where('Estado', comparatorsArray[0], queryForm['Estado']).where('Sistema', comparatorsArray[1], queryForm['Sistema']).where('ImpactoEnUsuarios', comparatorsArray[2], queryForm['Impacto']).where('Severidad', comparatorsArray[3], queryForm['Severidad']).where('TipoMoneda', comparatorsArray[4], queryForm['Moneda'])).valueChanges();
      
  }

  //Aqui estaba probando funciones para consumir API's - puede que sirva para un futuro.
  funcion_prueba(){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-key':  '41c1cfc11cmsh105143432b738d9p1f8893jsn98ff9b5ea03a',
        'x-rapidapi-host': 'quotes15.p.rapidapi.com'
      })
    };
    const url:string = 'https://quotes15.p.rapidapi.com/quotes/random/?language_code=es';
    return this.http.get(url, httpOptions);
  }

  funcion_prueba2(){
    const httpOptions = {
      headers: new HttpHeaders({
        'x-rapidapi-key':  '41c1cfc11cmsh105143432b738d9p1f8893jsn98ff9b5ea03a',
        'x-rapidapi-host': 'covid-193.p.rapidapi.com'
      })
    };
    return this.http.get('https://covid-193.p.rapidapi.com/countries', httpOptions);
  }
}
