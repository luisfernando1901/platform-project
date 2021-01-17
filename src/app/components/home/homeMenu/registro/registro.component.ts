import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  isLinear = false;
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
  ubicaciones: string[]=[
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
  componentes:string[] = [
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
  marcaComponentes:string[] = [
  'San Lorenzo',
  'Celima',
  'Phillips',
  'Samsung',
  'Vainsa',
  'Trébol',
  'ThyssenKrupp'
  ];
  proveedores:string[] = [
  'Decor Center',
  'Maestro',
  'Sodimac',
  'Promart',
  'ThyssenKrupp'
  ];
  tiposDeLeccionAprendida:string[] = [
  'Suposiciones de diseño incorrectas',
  'Defectos de diseño',
  'Especificaciones técnicas deficientes',
  'Malas prácticas constructivas',
  'Problemas de mantenimiento'
  ];
  niveles:string[] = ['Alto','Medio','Bajo'];
  constructor(private _formBuilder:FormBuilder) { }

  ngOnInit():void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

}
