import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BranchofficeModel } from 'src/app/core/models/branchoffice.model';
import { BusinessModel } from 'src/app/core/models/business.model';
import { BranchofficeService } from 'src/app/core/services/branchoffice/branchoffice.service';
import { BusinessService } from 'src/app/core/services/business/business.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-branchoffice',
  templateUrl: './update-branchoffice.component.html',
  styleUrls: ['./update-branchoffice.component.scss']
})
export class UpdateBranchofficeComponent implements OnInit {

  titleForm = 'Actualizar Sucursal';
  branchofficeModel?: BranchofficeModel;
  businessModel?: BusinessModel;
  idBranchoffice = 0;
  idBusiness = 0;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private branchofficeService: BranchofficeService,
    private router: Router,
    private business: BusinessService,
  ) { }

    /**
   * Inicializa el formulario
   */
     ngOnInit(): void {
      this.title.setTitle(`${this.titleForm} ${environment.page.suffix}`);
      this.route.params.subscribe((params: Params) => {
        console.log(params)
        this.idBranchoffice = params['id'];
        this.idBusiness = params['idBusiness'];
        this.getBusiness();
        console.log(this.idBusiness)
        this.branchofficeService.get(this.idBranchoffice).subscribe((data: any) => {
          console.log(data);
          if(data && data.data){
            this.branchofficeModel = data.data;
          }
        });
      });
    }

    getBusiness(){
      this.business.get(this.idBusiness).subscribe(data => {
        this.businessModel = data.data;
        console.log(this.businessModel);
      })
    }


  /**
   * Recibe datos del evento del componente hijo (formulario)
   * para invocar el servicio de actualizar sucursal
   * @param branchofficeModel
   */
   save(branchofficeModel: BranchofficeModel) {
    branchofficeModel.business = {id: this.idBusiness}
    branchofficeModel.id = this.idBranchoffice;
    console.log('id de la sucursal ' + this.idBranchoffice);
    console.log(`[ACTUALIZAR] Recibiendo datos del formulario ${JSON.stringify(branchofficeModel)}`);
    this.branchofficeService.update(this.idBranchoffice, branchofficeModel).subscribe((data) => {
      console.log(data);
      this.router.navigate([`console/business/${this.idBusiness}/branchoffice`]);
      //this.router.navigate(['console/branchoffice']);
    });
  }
  
}
