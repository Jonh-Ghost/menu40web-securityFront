import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { BranchofficeService } from "src/app/core/services/branchoffice/branchoffice.service";
import { BranchofficeModel } from "src/app/core/models/branchoffice.model";
import { UiService } from "src/app/core/services/ui/ui.service";
import { BusinessService } from "src/app/core/services/business/business.service";
import { BusinessModel } from "src/app/core/models/business.model";

@Component({
  selector: 'app-create-branchoffice',
  templateUrl: './create-branchoffice.component.html',
  styleUrls: ['./create-branchoffice.component.scss']
})
export class CreateBranchofficeComponent implements OnInit {
  
  enabledSaveBranchoffice$ = new BehaviorSubject<boolean>(false);
  businessModel?: BusinessModel;

  titleForm = 'Registro Sucursal';

  idBranchoffice = 0;
  idBusiness = 0; 
  name?: string;

  constructor(
    private title: Title,
    private branchofficeServices: BranchofficeService,
    private route: ActivatedRoute,
    private business: BusinessService,
    private router: Router,
    private uiService: UiService,
  ) { }

  /**
   * Inicializa el componente
   */
   ngOnInit(): void {
    this.title.setTitle(`${this.titleForm} | App`);
    this.route.params.subscribe((params: Params) =>{
      console.log(params)
      this.idBusiness = params['idBusiness'];
      this.getBusiness();
    })
  }

  getBusiness(){
    this.business.get(this.idBusiness).subscribe(data => {
      this.businessModel = data.data;
      console.log(this.businessModel);
    })
  }

  saveNewAccount(value: any) {
    console.log(value);
    this.business.create(value).subscribe((data: any) => {
      // console.log(data);
      if (data.code != 2000) {
        this.idBranchoffice = data.data.id;
        this.uiService.showMessage(data.message, 'aceptar');
      } else {
        this.uiService.showMessage(data.message, 'aceptar');
      }
    }, error => {
      console.error(error);
      this.uiService.showMessage('Ocurrio un error intente más tarde', 'aceptar');
    })
  }

  /**
   * Recibe datos del evento del componente hijo (formulario)
   * para invocar el servicio de registrar sucursal
   * @param branchofficeModel
   */
   save(branchofficeModel: BranchofficeModel) {


    branchofficeModel.business = {id: this.idBusiness};
    console.log(`[Registro] Recibiendo datos del formulario ${JSON.stringify(branchofficeModel)}`);
    this.branchofficeServices.create(branchofficeModel).subscribe((ngBranchofficeData) => {
      console.log(ngBranchofficeData);
      this.router.navigate([`console/business/${this.idBusiness}/branchoffice`]);
    }, error => {
      console.error(error);
      console.log(this.save);
      this.uiService.showMessage('Ocurrio un error intente más tarde', 'aceptar');
    });
  }
}