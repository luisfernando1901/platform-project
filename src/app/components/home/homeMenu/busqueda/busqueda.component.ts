import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatabaseService } from '../../../../services/database.service';
import { ObservableLike, Subscription } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BusquedaComponent implements OnInit, OnDestroy {
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  subscription4: Subscription;
  unsubscribe: boolean = false;
  sistemas: string[] = [
    '-',
    'Accesibilidad',
    'Arquitectura',
    'Ascensores',
    'HVAC',
    'Iluminación',
    'Instalaciones Eléctricas',
    'Instalaciones Sanitarias',
    'Ruidos y vibraciones ambientales',
    'Sistema contra incendio',
    'Sistema de emergencia',
    'Sistema Mecánico',
    'Ventilación y climatización'
  ];
  niveles: string[] = ['-', 'Alto', 'Medio', 'Bajo'];
  estados: string[] = ['-', 'Pendiente', 'Solucionado'];
  monedas: string[] = ['-', 'Soles', 'Dólares'];

  CON: any[] = [];
  DIS: any[] = [];
  OyM: any[] = [];
  //Formulario de consulta
  queryForm = this.fb.group({
    Estado: ['-'],
    Sistema: ['-'],
    ImpactoEnUsuarios: ['-'],
    Severidad: ['-'],
    CostoMenor: ['-'],
    CostoMayor: ['-'],
    TipoMoneda: ['-'],
  });
  constructor(private fb: FormBuilder,
    private databaseService: DatabaseService) { }

  ngOnInit(): void {
  }
  ngOnDestroy() {
  }

  search_by_code(code:string){
    //Limpiamos las variables iniciales
    this.CON =[];
    this.DIS = [];
    this.OyM = [];
    let userInfo: any = {};
    //Convertimos a UpperCase
    let u_code = code.toUpperCase();
    let codeName = u_code.split("-",1)
    let data:object[]=[];
    if (codeName[0] == "OYM") {
      codeName[0] = "OyM";
      let nuevo = u_code.replace('OYM','OyM');
      u_code = nuevo;
    }
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.subscription4 = this.databaseService.searchProblems(userInfo['company'], userInfo['projectName'], codeName[0]).subscribe(params => {
      console.log(params);
      data = params;
      for (let index = 0, value:object ; index < data.length; index++) {
        //Recorremos cada uno de los objetos dentro del array
        value = data[index];
        if (value['Codigo'] == u_code) {
          if (codeName[0] == "CON") {
            this.CON.push(value);
          }
          if (codeName[0] == "DIS") {
            this.DIS.push(value);
          }
          if (codeName[0] == "OyM") {
            this.OyM.push(value);
          }
          break;
        }
      }
      this.subscription4.unsubscribe();
    });
  }

  search() {
    console.log(this.queryForm.value);
    this.CON =[];
    this.DIS = [];
    this.OyM = [];
    let obj: any = {};
    let tipo = ['CON', 'DIS', 'OyM'];
    let userInfo: any = {};
    let CON: object[], DIS: object[], OyM: object[];
    let array = ['Estado', 'Sistema', 'ImpactoEnUsuarios', 'Severidad', 'TipoMoneda'], new_array: string[]=[];
    
    obj = this.queryForm.value;
    //Creamos el nuevo array
    for (let index = 0; index < array.length; index++) {
      console.log('obj[array[index]]:');
      console.log(obj[array[index]]);
      if (obj[array[index]] != '-') {
        //En este array estan los nombres de los campos que no son '-'
        new_array.push(array[index]);
      }
    }
    console.log(new_array);
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.subscription1 = this.databaseService.searchProblems(userInfo['company'], userInfo['projectName'], tipo[0]).subscribe(params => {
      console.log(params);
      CON = params;
      this.CON = this.filter(CON,new_array,obj);
      console.log('Este es mi CON filtrado:');
      console.log(this.CON);
      this.subscription1.unsubscribe();
    });
    this.subscription2 = this.databaseService.searchProblems(userInfo['company'], userInfo['projectName'], tipo[1]).subscribe(params => {
      console.log(params);
      DIS = params;
      this.DIS = this.filter(DIS,new_array,obj);
      console.log('Este es mi DIS filtrado:');
      console.log(this.DIS);
      this.subscription2.unsubscribe();
    });
    this.subscription3 = this.databaseService.searchProblems(userInfo['company'], userInfo['projectName'], tipo[2]).subscribe(params => {
      OyM = params;
      console.log('Console.log del OyM:');
      console.log(OyM);
      this.OyM = this.filter(OyM,new_array,obj);
      console.log('Este es mi OyM filtrado:');
      console.log(this.OyM);
      this.subscription3.unsubscribe();
    });
  }

  //Función de filtrado
  filter(code_array:object[],new_array:string[],obj:any) {
    let code_filtered: object[]=[];
    for (let index = 0, aux: object; index < code_array.length; index++) {
      //console.log('Tamaño del OyM.lenght:');
      //console.log(code_array.length);
      //En este aux tengo el objeto a ser filtrado
      aux = code_array[index];
      //console.log('Valor que toma el objeto aux');
      //console.log(aux);
      //console.log('Console.log del new_array-lenght:');
      //console.log(new_array.length);
      for (let index2 = 0, agregar = 0; index2 < new_array.length; index2++) {
        //console.log('print del new_array[index2]:');
        //console.log(new_array[index2]);//Aqui sale un string

        //console.log('print del obj[new_array[index2]]');
        //console.log(obj[new_array[index2]]);

        //console.log('print del aux[new_array[index2]]');
        //console.log(aux[new_array[index2]]);
        if (aux[new_array[index2]] == obj[new_array[index2]]) {
          agregar++;
        }
        if (agregar == new_array.length) {
          code_filtered.push(aux);
          //console.log('Largo de OyM_filtered');
          //console.log(code_filtered.length);
        }
      }
    }
    return code_filtered;
  }
}

