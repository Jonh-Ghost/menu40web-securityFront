import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']
})
export class OwnersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  documentos = [
    { nombre: 'Documento 1', seleccionado: false },
    { nombre: 'Documento 2', seleccionado: false },
    { nombre: 'Documento 3', seleccionado: false },
    // Agrega más documentos según sea necesario
  ];

  guardarSeleccion() {
    const seleccionados = this.documentos.filter(doc => doc.seleccionado);
    console.log('Documentos seleccionados:', seleccionados);
    // Aquí puedes agregar lógica para manejar la selección
  }
}
