import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { BusinessModel } from 'src/app/core/models/business.model';
import { environment } from 'src/environments/environment';
import { WindowRef } from 'src/app/core/browser-native/window-native.element'
import { LoginService } from 'src/app/core/services/login/login.service';
import { BaseCatModel } from 'src/app/core/models/base-cat.model';

@Component({
  selector: 'app-form-business',
  templateUrl: './form-business.component.html',
  styleUrls: ['./form-business.component.scss']
})
export class FormBusinessComponent implements OnInit {

  @Input() title = '';
  @Input() isUpdate = false;
  @Input() businessData?: BusinessModel;
  @Input() typesBusiness: Array<BaseCatModel> = [];
  @Output() ngBusinessData = new EventEmitter<BusinessModel>();
  businessForm?: FormGroup;
  
  isSubmit = false;
  isLinear = false;

  titlePage = 'Registrate';
  showProgressBar = false;

  constructor(
    private formBuilder: FormBuilder,
  //  private title:Title,
    private loginService: LoginService,
    private router: Router,
    private windowRef: WindowRef
  ) { }

  /**
   * Inicializa el componente
   */
  ngOnInit(): void {
    //this.title.setTitle(`${this.titlePage} ${environment.page.suffix}`);
    this.buildFormBusiness();
    if (this.isUpdate) {
      console.log('Form update');
      console.log(this.businessData)
      this.setDataToUpdate(this.businessData!);
    }
  }

    

  save(data: any) {
    console.log(data);
    this.showProgressBar = true;
    this.loginService.getSesion(data).subscribe((value) => {
      if (value) {
        setTimeout(() => {
          this.showProgressBar = true;
          // this.router.navigate(['console/home']);
          this.windowRef.nativeWindow.location.assign('/console/home');
          this.windowRef.nativeWindow.localStorage.setItem('on_session', 'true');
        }, 3000);
      }
    });
  }


  /**
   * Construye el Reactive Form angular
   */
  buildFormBusiness(): void {
    this.businessForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      typeBusiness: ['', Validators.compose([Validators.required])]
    });
  }

  /**
   * Cuando es actualizar, contruye el Reactive Form con datos que
   * provienen del componente padre
   * @param businessModel 
   */
  setDataToUpdate(businessModel: BusinessModel): void {
    this.businessForm?.get('name')?.setValue(businessModel.name);
    this.businessForm?.get('typeBusiness')?.setValue(businessModel.typeBusiness);
    this.businessForm?.updateValueAndValidity();    
  }

  /**
   * Cuando la información del formulario es correcta emite un evento
   * con los datos del formulario
   */
  onSubmit(): void {
    
    console.log(this.businessForm?.valid);
    console.log(this.businessForm?.value);
    this.isSubmit = true;
    if (this.businessForm?.valid) {
      let type = this.typesBusiness.find(item => item.id == this.businessForm?.value.typeBusiness);

      const business: BusinessModel = {
        name: this.businessForm?.value.name,
        typeBusiness: type
      }
      this.ngBusinessData.emit(business);
    }
  }

}
