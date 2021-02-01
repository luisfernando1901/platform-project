import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BusquedaComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

}
