import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../../services/database.service';


@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.databaseService.funcion_prueba().subscribe(params => {
      console.log(params['content']);
    });
    this.databaseService.funcion_prueba2().subscribe(params => console.log(params));
  }

}
