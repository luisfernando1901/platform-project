import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
//Importamos el servicio
import { DatabaseService } from '../../../../services/database.service';


//Todo esto se importa para cambiar de fecha el datepicker
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class RegistroComponent implements OnInit {
  isLinear = false;
  frmStepper: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  sistemas: string[] = [
    'Arquitectura',
    'Instalaciones Sanitarias',
    'Instalaciones Eléctricas',
    'Iluminación',
    'HVAC',
    'Sistema contra incendio',
    'Accesibilidad',
    'Ascensores',
    'Ruidos y vibraciones ambientales',
    'Ventilación y climatización',
    'Sistema Mecánico',
    'Sistema de emergencia'
  ];
  efectos: string[] = [
    'Demolición',
    'Reconstrucción',
    'Reinstalación',
    'Remodelación',
    'Retrabajo',
    'Reparación'
  ];
  encargados: string[] = [
    'Cliente',
    'Proyectista',
    'Contratista',
    'Administrador del edificio'
  ];
  ubicaciones: string[] = [
    'Lobby de ingreso',
    'Hall de ascensores',
    'Sótano',
    'Oficinas',
    'Cuarto de máquinas',
    'Fachada',
    'Áreas comunes',
    'Cuarto de Acopio',
    'Estacionamiento',
    'Red de tubería',
    'Azotea',
    'Oficinas',
    'Cuarto de Bombas'
  ];
  componentes: string[] = [
    'Piso cerámico',
    'Zócalo cerámico',
    'Piso porcelanato',
    'Zócalo porcelanato',
    'Muro de drywall',
    'Muro estructural',
    'Columna estructural',
    'Viga estructural',
    'Ascensor',
    'Bombas de agua',
    'Luminarias LED',
    'Medidores de agua',
    'Inodoro',
    'Urinario',
    'Lavatorio',
    'Tubería',
    'Sistema de Ionización',
    'Muro cortina',
    'Chiller',
    'Sistema Aire condicionado',
    'Luces de Emergencia',
    'Sistema de Extracción',
    'Cables',
    'Luminarias',
    'Ventanas',
    'Intercomunicador',
    'Pintura de muro',
    'Bombas Hidraulicas'
  ];
  marcaComponentes: string[] = [
    'San Lorenzo',
    'Celima',
    'Phillips',
    'Samsung',
    'Vainsa',
    'Trébol',
    'ThyssenKrupp'
  ];
  proveedores: string[] = [
    'Decor Center',
    'Maestro',
    'Sodimac',
    'Promart',
    'ThyssenKrupp'
  ];
  tiposDeLeccionAprendida: string[] = [
    'Suposiciones de diseño incorrectas',
    'Defectos de diseño',
    'Especificaciones técnicas deficientes',
    'Malas prácticas constructivas',
    'Problemas de mantenimiento'
  ];
  origenesDeProblema: string[] = [
    'Diseño',
    'Construcción',
    'Operación y mantenimiento'
  ];
  niveles: string[] = ['Alto', 'Medio', 'Bajo'];

  constructor(private _formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    private databaseService: DatabaseService) {

  }

  ngOnInit(): void {
    this.frmStepper = this._formBuilder.group({
      steps: this._formBuilder.array([
        this._formBuilder.group({
          // ... form controls for our step
          // Fecha: [''], // Aún no se sabe si agregamos la elección de fecha o lo guardamos con la fecha del mismo ingreso del problema
          Sistema: [''],
          Ubicacion: [''],
          Componente:[''],
          MarcaDelComponente:[''],
          Proveedor: ['']
        }),
        this._formBuilder.group({
          // ... form controls for our step
          OrigenDelProblema: [''],
          Efecto: [''],
          Severidad:[''],
          ImpactoEnUsuarios:[''],
          PersonalEncargado: [''],
          Costo: [''],
          Tiempo: [''],
          DescripcionDelProblema: [''],
          Causa: [''],
          Consecuencia: [''],
          AccionEmprendida: ['']
        }),
        this._formBuilder.group({
          // ... form controls for our step
          TipoDeLeccionAprendida: [''],
          Reportado: [''],
          Rescatar:[''],
          PropuestaEspecialista:[''],
          ResultadoPropuestaEspecialista: [''],
          PropuestaAdministrador: [''],
          ResultadoPropuestaAdministrador: ['']
        })
        // ... more form groups for each step we have
      ]),
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this._adapter.setLocale('es');
  }

  registrar() {
    let d = new Date();
    let day = d.getDate().toString();
    let month = (d.getMonth() + 1).toString();
    let year = d.getFullYear().toString();
    let fulldate: string = day + '/' + month + '/' + year;

    console.log(fulldate);

  }
  // formArray getter
  get formArray() {
    return this.frmStepper.get('steps') as FormArray;
  }

  submit(){
    let userInfo:any = {};
    let formArray: object[] = [];
    let formObj = {};
    formArray = this.frmStepper.get('steps').value;
    formObj = Object.assign(formArray[0],formArray[1],formArray[2]);
    console.log(formObj);
    //Aqui obtenemos los parámetros necesarios para llegar al documento de registro de problema en Firecloud
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //Aqui falta implementar el llamado al servicio de agregar un Problema
    this.databaseService.addProblem(userInfo['company'],userInfo['projectName'],formObj);
  }

}
