import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { BusinessService } from 'src/app/core/services/business/business.service';
import { MenuModel } from 'src/app/core/models/menu.model';
import Swal from 'sweetalert2';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { CatTypeMenuProductService } from 'src/app/core/services/cat-type-menu-product/cat-type-menu-product.service';
import { BaseCatModel } from 'src/app/core/models/base-cat.model';
import { environment } from 'src/environments/environment';
import { BranchofficeService } from 'src/app/core/services/branchoffice/branchoffice.service';
import { UiService } from 'src/app/core/services/ui/ui.service';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.scss']
})
export class CreateMenuComponent implements OnInit {

  titleForm = 'Registro de Menú';
  menuModel?: MenuModel;
  idBusiness = 0;
  idBranchOffice = 0;
  typesMenu: Array<BaseCatModel> = [];

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private branchOfficeService: BranchofficeService,
    private uiService: UiService,
    private businessServices: BusinessService,
    private menuServices: MenuService,
    private router: Router,
    private catTypeMenuProductService: CatTypeMenuProductService
  ) { }

  ngOnInit(): void {

    this.title.setTitle(`${this.titleForm} | ${environment.page.suffix}`);

    this.route.params.subscribe((params: Params) => {

      this.idBusiness = Number(params ['idBusiness']);
      this.idBranchOffice = Number(params['idBranchOffice']);

      console.log("id del business " + this.idBusiness);
      console.log("id de la sucursal " + this.idBranchOffice);

      this.branchOfficeService.get(this.idBranchOffice).subscribe((data: any) => {
        console.log(data);
        if (data && data.data) {
          this.menuModel = data.data;
        }
      });

    });

    this.catTypeMenuProductService.getByFilter().subscribe(typesMenuResponse => {
      this.typesMenu = typesMenuResponse.data;
      console.log(this.typesMenu);
    }, error => {
      this.typesMenu = [];
    });
  }

  /**
   * Recibe datos del evento del componente hijo (formulario)
   * para invocar el servicio de registrar menu
   * @param menuModel
   */
  save(menuModel: MenuModel) {

    menuModel.idBranchOffice = { id: this.idBranchOffice };
    console.log(`[REGISTRO] Recibiendo datos del fomrulario ${JSON.stringify(menuModel)}`);

    this.menuServices.create(menuModel).subscribe((data) => {
      console.log(data);

      this.uiService.showSuccessAlert('Se registro el menú correctamente');

      /*Swal.fire(
        'Exito al registrar',
        `Se registro el menú correctamente`,
        'success'
      )*/

      this.router.navigate(['console/business/' + this.idBusiness + '/branchoffice/' + this.idBranchOffice + '/menu']);
    });
  }
}
