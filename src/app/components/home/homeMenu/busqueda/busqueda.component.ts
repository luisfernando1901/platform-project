import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatabaseService } from '../../../../services/database.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BusquedaComponent implements OnInit,OnDestroy {
  subscription1: Subscription;
  subscription2: Subscription;
  subscription3: Subscription;
  unsubscribe: boolean = false;
  sistemas: string[] = [
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
  niveles: string[] = ['Alto', 'Medio', 'Bajo'];
  estados: string[] = ['Pendiente','Solucionado'];
  obj:any = {};

  CON:any[] = [];
  DIS:any[] = [];
  OyM:any[] = [];
  //Formulario de consulta
  queryForm = this.fb.group({
    Estado: [''],
    Sistema: [''],
    Impacto: [''],
    Severidad: [''],
    CostoMenor: [''],
    CostoMayor: [''],
    Moneda: [''],
  });
  constructor(private fb:FormBuilder,
              private databaseService:DatabaseService) { }

  ngOnInit(): void {
  }
  ngOnDestroy(){
  }

  search(){
    console.log(this.queryForm.value);
    this.obj = this.queryForm.value;
    let tipo = ['CON','DIS','OyM'];
    let userInfo: any = {};
    

    userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.subscription1 = this.databaseService.searchProblems(userInfo['company'], userInfo['projectName'],this.obj,tipo[0]).subscribe(params => {
      console.log(params);
      this.CON = params;
      this.subscription1.unsubscribe();
    });
    this.subscription2 = this.databaseService.searchProblems(userInfo['company'], userInfo['projectName'],this.obj,tipo[1]).subscribe(params => {
      console.log(params);
      this.DIS = params;
      this.subscription2.unsubscribe();
    });
    this.subscription3 = this.databaseService.searchProblems(userInfo['company'], userInfo['projectName'],this.obj,tipo[2]).subscribe(params => {
      console.log(params);
      this.OyM = params;
      this.subscription3.unsubscribe();
    });
    
  }

}
