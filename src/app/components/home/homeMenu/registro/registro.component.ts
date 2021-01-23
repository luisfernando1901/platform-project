import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
//Importamos el servicio
import { DatabaseService } from '../../../../services/database.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

//Todo esto se importa para cambiar de fecha el datepicker
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatHorizontalStepper } from '@angular/material/stepper';

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
export class RegistroComponent implements OnInit, OnDestroy {
  subscription1: Subscription;
  unsubscribe:boolean = false;
  stepperReset:boolean = false;
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
    private databaseService: DatabaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    //Lógica para que no salte error en el unsubscribe cuando no se haya a subscrito a nada 
    if (this.unsubscribe) {
      this.subscription1.unsubscribe();
    }
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
    let problemsAmount:any = {}, updateField:string, updateFieldObj:any = {};
    let formArray: object[] = [];
    let formObj = {};
    let code:string, code_problem:string;
    let indice:number;
    let indice_str:string;
    formArray = this.frmStepper.get('steps').value;
    formObj = Object.assign(formArray[0],formArray[1],formArray[2]);
    console.log(formObj);
    //Lógica para definir el código del problema registrado
    if (formObj['OrigenDelProblema']=='Diseño') {
      code='DIS';
      updateField = 'cantidad.DIS';
    }
    if (formObj['OrigenDelProblema']=='Construcción') {
      code='CON';
      updateField = 'cantidad.CON';
    }
    if (formObj['OrigenDelProblema']=='Operación y mantenimiento') {
      code='OyM';
      updateField = 'cantidad.OyM';
    }
    //Aqui obtenemos los parámetros necesarios para llegar al documento de registro de problema en Firecloud 
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //Usamos un servicio para obtener el índice del nuevo problema a registrar
    this.subscription1 = this.databaseService.calculateIndex(userInfo['company'],userInfo['projectName']).subscribe(params =>{
      this.unsubscribe = true;
      problemsAmount = params;
      console.log('Este es el problem amount al cual le voy a sumar 1:');
      console.log(problemsAmount);
      indice = problemsAmount['cantidad'][code] + 1;
      //Creamos el updateFieldObj
      updateFieldObj[updateField] = indice;
      //console.log(updateFieldObj);
      //Convertimos el número en string para hacer el append
      indice_str = indice.toString();
      code_problem = code + '-' + indice_str;
      //Servicio de agregar un problema con los parámetros dinámicos de company, project, code, code_pronlem y formObj
      this.databaseService.addProblem(userInfo['company'],userInfo['projectName'],code,code_problem,formObj);
      //Hacemos unSubscribe porque en el servicio de abajo vamos a editar el Index de la cantidad de problema, y el subscribe de arriba detectaría que cambió y
    //haría todo de nuevo y así se convertiría en un bucle infinito
    this.subscription1.unsubscribe();
    //Utilizamos el servicio de updateProblemAmount
    this.databaseService.updateProblemAmount(userInfo['company'],userInfo['projectName'],updateFieldObj);
    //Limpiamos el formulario
    this.frmStepper.reset();
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    });
    
  }

}
