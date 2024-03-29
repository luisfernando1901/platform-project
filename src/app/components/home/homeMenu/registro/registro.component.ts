import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
//Importamos el servicio
import { DatabaseService } from '../../../../services/database.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
//Importamos el snackbar para utilizarlo en este componente
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ],
  encapsulation: ViewEncapsulation.None
})
export class RegistroComponent implements OnInit, OnDestroy {
  subscription1: Subscription; subscription2: Subscription;
  unsubscribe: boolean = false; unsubscribe2: boolean;
  codigo: string = '';
  stepperReset: boolean = false;
  isLinear = false;
  frmStepper: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
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
  efectos: string[] = [
    'Demolición',
    'Reconstrucción',
    'Reinstalación',
    'Remodelación',
    'Reparación',
    'Retrabajo'
  ];
  encargados: string[] = [
    'Administrador del edificio',
    'Cliente',
    'Contratista',
    'Proyectista'
  ];
  ubicaciones: string[] = [
    'Azotea',
    'Áreas comunes',
    'Cuarto de Acopio',
    'Cuarto de Bombas',
    'Cuarto de máquinas',
    'Estacionamiento',
    'Fachada',
    'Hall de ascensores',
    'Lobby de ingreso',
    'Oficinas',
    'Oficinas',
    'Red de tubería',
    'Sótano'
  ];
  componentes: string[] = [
    'Ascensor',
    'Bombas de agua',
    'Bombas Hidráulicas',
    'Cables',
    'Chiller',
    'Columna estructural',
    'Inodoro',
    'Intercomunicador',
    'Lavatorio',
    'Luces de Emergencia',
    'Luminarias LED',
    'Luminarias',
    'Medidores de agua',
    'Muro cortina',
    'Muro de drywall',
    'Muro estructural',
    'Pintura de muro',
    'Piso cerámico',
    'Piso porcelanato',
    'Sistema Aire condicionado',
    'Sistema de Extracción',
    'Sistema de Ionización',
    'Tubería',
    'Urinario',
    'Ventanas',
    'Viga estructural',
    'Zócalo cerámico',
    'Zócalo porcelanato'
  ];
  marcaComponentes: string[] = [
    'Celima',
    'Phillips',
    'Samsung',
    'San Lorenzo',
    'ThyssenKrupp',
    'Trébol',
    'Vainsa'
  ];
  proveedores: string[] = [
    'Decor Center',
    'Maestro',
    'Promart',
    'Sodimac',
    'ThyssenKrupp'
  ];
  tiposDeLeccionAprendida: string[] = [
    'Defectos de diseño',
    'Especificaciones técnicas deficientes',
    'Malas prácticas constructivas',
    'Problemas de mantenimiento',
    'Suposiciones de diseño incorrectas'
  ];
  origenesDeProblema: string[] = [
    'Construcción',
    'Diseño',
    'Operación y mantenimiento'
  ];
  niveles: string[] = ['Alto', 'Medio', 'Bajo'];
  estados: string[] = ['Pendiente','Solucionado'];

  constructor(private _formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    private databaseService: DatabaseService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.frmStepper = this._formBuilder.group({
      steps: this._formBuilder.array([
        this._formBuilder.group({
          // ... form controls for our step
          // Fecha: [''], // Aún no se sabe si agregamos la elección de fecha o lo guardamos con la fecha del mismo ingreso del problema
          Sistema: [''],
          Ubicacion: [''],
          Componente: [''],
          MarcaDelComponente: [''],
          Proveedor: [''],
          Estado:['']
        }),
        this._formBuilder.group({
          // ... form controls for our step
          Codigo:[''],
          OrigenDelProblema: ['', Validators.required],
          Efecto: [''],
          Severidad: [''],
          ImpactoEnUsuarios: [''],
          PersonalEncargado: [''],
          Costo: [''],
          TipoMoneda: [''],
          DiaInicio: ['', Validators.required],
          DiaFin: ['', Validators.required],
          DescripcionDelProblema: [''],
          Causa: [''],
          Consecuencia: [''],
          AccionEmprendida: ['']
        }),
        this._formBuilder.group({
          // ... form controls for our step
          TipoDeLeccionAprendida: [''],
          Rescatar: [''],
          PropuestaEspecialista: [''],
          PropuestaAdministrador: [''],
          ResultadoPropuesta: ['']
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
    if (this.unsubscribe2) {
      this.subscription2.unsubscribe();
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

  setCode() {
    let userInfo: any = {};
    let code: string = '', origen: string;
    let problemsAmount: any = {};
    let indice: number, indice_str: string, code_problem: string;
    let formArray: object[] = [];
    formArray = this.frmStepper.get('steps').value;
    origen = formArray[1]['OrigenDelProblema']
    //Lógica para definir el código del problema registrado
    if (origen == 'Diseño') {
      code = 'DIS';
    }
    if (origen == 'Construcción') {
      code = 'CON';
    }
    if (origen == 'Operación y mantenimiento') {
      code = 'OyM';
    }
    if (code != '') {
      //console.log(code);
      userInfo = JSON.parse(localStorage.getItem('userInfo'));
      this.subscription2 = this.databaseService.calculateIndex(userInfo['company'], userInfo['projectName']).subscribe(params => {
        this.unsubscribe2 = true;
        problemsAmount = params;
        indice = problemsAmount['cantidad'][code] + 1;
        //Convertimos el número en string para hacer el append
        indice_str = indice.toString();
        code_problem = code + '-' + indice_str;
        this.codigo = code_problem;
        //console.log(this.codigo);
      });
    }
  }
  // formArray getter
  get formArray() {
    return this.frmStepper.get('steps') as FormArray;
  }

  submit() {
    let userInfo: any = {};
    let problemsAmount: any = {}, updateField: string, updateFieldObj: any = {};
    let formArray: object[] = [];
    let formObj = {};
    let code: string, code_problem: string;
    let indice: number;
    let indice_str: string;
    let aux1: any = {};
    let aux2: any = {};
    formArray = this.frmStepper.get('steps').value;
    //Cambiamos la estructura de fecha para que solo sea dia mes y año (Recordar que enero simboliza el 0 y diciembre el 11)
    aux1 = formArray[1]['DiaInicio']['_i'];
    aux2 = formArray[1]['DiaFin']['_i'];
    formObj = Object.assign(formArray[0], formArray[1], formArray[2]);
    formObj['DiaInicio'] = aux1;
    formObj['DiaFin'] = aux2;
    formObj['Codigo'] = this.codigo;
    console.log(formObj);
    //Lógica para definir el código del problema registrado
    if (formObj['OrigenDelProblema'] == 'Diseño') {
      code = 'DIS';
      updateField = 'cantidad.DIS';
    }
    if (formObj['OrigenDelProblema'] == 'Construcción') {
      code = 'CON';
      updateField = 'cantidad.CON';
    }
    if (formObj['OrigenDelProblema'] == 'Operación y mantenimiento') {
      code = 'OyM';
      updateField = 'cantidad.OyM';
    }
    //Aqui obtenemos los parámetros necesarios para llegar al documento de registro de problema en Firecloud 
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //Usamos un servicio para obtener el índice del nuevo problema a registrar
    this.subscription1 = this.databaseService.calculateIndex(userInfo['company'], userInfo['projectName']).subscribe(params => {
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
      this.databaseService.addProblem(userInfo['company'], userInfo['projectName'], code, code_problem, formObj)
        .then(done => {
          this.openSnackBar('Registro exitoso!');
        })
        .catch(error => {
          this.openSnackBar('Registro fallido');
        });
      //Hacemos unSubscribe porque en el servicio de abajo vamos a editar el Index de la cantidad de problema, y el subscribe de arriba detectaría que cambió y
      //haría todo de nuevo y así se convertiría en un bucle infinito
      this.subscription1.unsubscribe();
      //Utilizamos el servicio de updateProblemAmount
      this.databaseService.updateProblemAmount(userInfo['company'], userInfo['projectName'], updateFieldObj);
      //Limpiamos el formulario
      this.frmStepper.reset();
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    });

  }
  //Funcion de notificación de problema registrado o con problemas de registrar
  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }

}
