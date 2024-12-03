import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BusinessService } from 'src/app/core/services/business/business.service';
import { MenuModel } from 'src/app/core/models/menu.model';
import Swal from 'sweetalert2';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { BaseCatModel } from 'src/app/core/models/base-cat.model';
import { CatTypeMenuProductService } from 'src/app/core/services/cat-type-menu-product/cat-type-menu-product.service';
import { BranchofficeService } from 'src/app/core/services/branchoffice/branchoffice.service';


@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.scss']
})
export class UpdateMenuComponent implements OnInit {

  titleForm = 'Actualizar menú';
  menuModel?: MenuModel;
  idBranchOffice = 0;
  idBusiness = 0;
  idMenu = 0;
  typesMenu: Array<BaseCatModel> = [];

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private branchOfficeService: BranchofficeService,
    private businessServices: BusinessService,
    private menuService: MenuService,
    private router: Router,
    private catTypeMenuProductService: CatTypeMenuProductService
  ) { }

  /**
   * Inicializa el formulario
   */
  ngOnInit(): void {
    this.title.setTitle(`${this.titleForm} | Menu 4.0`);

    this.route.params.subscribe((params: Params) => {

      this.idBusiness = Number(params['idBusiness']);
      this.idBranchOffice = Number(params['idBranchOffice']);

      console.log("id del bussiness " + this.idBusiness);
      console.log("id de la sucursal " + this.idBranchOffice);

      this.branchOfficeService.get(this.idBranchOffice).subscribe((data: any) => {
        console.log(data);
        if (data && data.data) {
          this.menuModel = data.data;
        }
      });

      this.catTypeMenuProductService.getByFilter().subscribe(typesMenuResponse => {
        this.typesMenu = typesMenuResponse.data;
        console.log(this.typesMenu);
      }, error => {
        this.typesMenu = [];
      });

    });

    this.route.params.subscribe((params: Params) => {
      this.idMenu = params['id'];
      this.menuService.get(this.idMenu).subscribe((data: any) => {
        console.log(data);
        if (data && data.data) {
          this.menuModel = data.data;
        }
      });
    });
  }

  /**
   * Recibe datos del evento del componente hijo (formulario)
   * para invocar el servicio de actualizar menu
   * @param menuModel
   */
  save(menuModel: MenuModel) {

    console.log(`[ACTUALIZAR] Recibiendo datos del formulario ${JSON.stringify(menuModel)}`);

    this.menuService.update(this.idMenu, menuModel).subscribe((data) => {
      console.log(data);
      Swal.fire(
        'Exito al actualizar',
        `Se actualizo el menú correctamente`,
        'success'
      )
      this.router.navigate(['console/business/' + this.idBusiness + '/branchoffice/' + this.idBranchOffice + '/menu']);
    });
  }

}
