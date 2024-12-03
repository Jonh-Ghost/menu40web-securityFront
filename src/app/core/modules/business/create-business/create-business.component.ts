import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BusinessModel } from 'src/app/core/models/business.model';
import { BusinessService } from 'src/app/core/services/business/business.service';
import { OwnerService } from 'src/app/core/services/owner/owner.service';
import { UiService } from 'src/app/core/services/ui/ui.service';
import { MatStepper } from '@angular/material/stepper';
import { OwnerModel } from './../../../models/owner.model';
import { ResponseObjectModel } from 'src/app/core/models/response/response.-object.model';
import { environment } from 'src/environments/environment';
import { CatTypeBusinessService } from 'src/app/core/services/cat-type-business/cat-type-business.service';
import { BaseCatModel } from 'src/app/core/models/base-cat.model';

@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.scss']
})
export class CreateBusinessComponent implements OnInit {

  @ViewChild('stepper', { static: true }) matStepper!: MatStepper;

  businessModel?: BusinessModel;
  ownerModel?: OwnerModel;
  titleForm = 'Registro negocio';
  idBusiness = 0;
  showProgressBar = false;
  typesBusiness: Array<BaseCatModel> = [];

  constructor(
    private title: Title,
    private businessServices: BusinessService,
    private ownerService: OwnerService,
    private router: Router,
    private uiService: UiService,
    private catTypeBusinessService: CatTypeBusinessService
  ) { }

  /**
   * Inicializa el componente
   */
  ngOnInit(): void {
    this.title.setTitle(`${this.titleForm} | ${environment.page.suffix}`);
    this.catTypeBusinessService.getByFilter().subscribe(typesBusinessResponse => {
      console.log('cat type business');
      this.typesBusiness = typesBusinessResponse.data;
    }, error => {
      this.typesBusiness = [];
    });
  }

  /**
   * Recibe datos del evento del componente hijo (formulario)
   * para invocar el servicio de registrar negocio
   * @param businessModel 
   */
  getInfoBusiness(businessModel: BusinessModel) {
    console.log(`[Registro] Recibiendo datos del fomrulario ${JSON.stringify(businessModel)}`);
    this.businessModel = businessModel;
    this.matStepper.selectedIndex = 2;
  }

  getInfoOwner(ownerModel: OwnerModel) {
    console.log(`[Registro] Recibiendo datos del fomrulario ${JSON.stringify(ownerModel)}`);
    this.ownerModel = ownerModel;
    this.matStepper.selectedIndex = 1;
  }

  createAccount(){
    if (this.businessModel && this.ownerModel) {
      this.showProgressBar = true;
      this.ownerService.create(this.ownerModel).subscribe(ownerResponse => {
        if (ownerResponse) {

          if (ownerResponse.code == 1000) {
            this.businessModel!.idOwner = {id: ownerResponse.data.id}
            this.businessServices.create(this.businessModel!).subscribe((responseOwner: ResponseObjectModel<OwnerModel>) => {
              console.log(responseOwner);
              this.showProgressBar = false;
              this.router.navigate(['console/business']);
            }, error => {
              console.error(error);
              this.showProgressBar = false;
              this.uiService.showErrorAlert('Ocurrio un error intente más tarde');
            });
          }
        }
      }, error => {
        this.showProgressBar = false;
        console.log(error);
      });

    }

  }

}
