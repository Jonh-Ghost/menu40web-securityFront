import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import {BusinessModel} from 'src/app/core/models/business.model';
import { BusinessService } from 'src/app/core/services/business/business.service';
import { OwnerService } from 'src/app/core/services/owner/owner.service';
import { UiService } from 'src/app/core/services/ui/ui.service';

@Component({
  selector: 'app-create-business',
  templateUrl: './create-business.component.html',
  styleUrls: ['./create-business.component.scss']
})
export class CreateBusinessComponent implements OnInit {

  enabledSaveBusiness$ = new BehaviorSubject<boolean>(false);

  titleForm = 'Registro negocio';

  idBusiness = 0;

  constructor(
    private title: Title,
    private businessServices: BusinessService,
    private owner: OwnerService,
    private router: Router,
    private uiService: UiService
  ) { }

  /**
   * Inicializa el componente
   */
  ngOnInit(): void {
    this.title.setTitle(`${this.titleForm} | App`);
  }

  saveNewAccount(value: any) {
    console.log(value);
    this.owner.create(value).subscribe((data: any) => {
      // console.log(data);
      if (data.code != 2000) {
        this.idBusiness = data.data.id;
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
   * para invocar el servicio de registrar negocio
   * @param businessModel 
   */
  save(businessModel: BusinessModel) {
    console.log(`[Registro] Recibiendo datos del fomrulario ${JSON.stringify(businessModel)}`);
    businessModel.idOwner = {id: this.idBusiness};
    this.businessServices.create(businessModel).subscribe((data) => {
      console.log(data);
      this.router.navigate(['business']);
    }, error => {
      console.error(error);
      this.uiService.showMessage('Ocurrio un error intente más tarde', 'aceptar');
    });
  }

}
