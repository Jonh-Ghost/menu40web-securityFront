import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuModel } from '../../models/menu.model';
import { MenuService } from '../../services/menu/menu.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MenuFilter } from '../../models/filter/menu.filter';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private code ? : string;

  displayedColumns: string[] = ['id', 'status', 'typeMenu', 'acciones'];
  dataSource!: MatTableDataSource<any>;
  menu: Array <MenuModel> = new Array <MenuModel>();
  idBranchOffice = 0;
  menuFilter!: MenuFilter;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private title: Title,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * Inicializa el componente ejecutando las fucniones necesarias
   */
  ngOnInit(): void {

    this.title.setTitle(`Lista de menus ${environment.page.suffix}`);

    this.route.params.subscribe((params: Params) => {

      this.idBranchOffice = params['idBranchOffice'];

      this.menuFilter = { idBranchOffice: this.idBranchOffice }
      console.log("id de la sucursal " + this.idBranchOffice);
      this.search();

    });
  }

  /**
   * Invoca el servicio de eliminar menú
   * @param MenuModel
   */
  delete(menuModel: MenuModel):void {
    let id = menuModel.id ? menuModel.id : 0;
    Swal.fire({
      icon: 'question',
      title: '¿Estas seguro de eliminar este menú?',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    }).then(result => {
      if(result.isConfirmed){
        this.menuService.delete(id).subscribe(() => {
          console.log(`Se eliminó ${menuModel.id} `);
          this.search();
          Swal.fire(
            'Exito al eliminar',
            `Se elimino el menú correctamente`,
            'success'
          )
        })
      }
    })

  }

  /**
   * Invoca el servicio de buscar menus
   */
  search(): void {
    console.log(`[FILTRAR] Recibiendo datos del formulario ${JSON.stringify(this.menuFilter)}`);
    this.menuService.getByFilter(this.menuFilter).subscribe((data: any) => {
      console.log(this.menuFilter);
      console.log(data);  
      if(data && data.data) {
        this.menu = data.data;
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  onSubmit(menuFilter: MenuFilter): void{
    this.menuFilter = menuFilter;
    this.search();
  }
}
