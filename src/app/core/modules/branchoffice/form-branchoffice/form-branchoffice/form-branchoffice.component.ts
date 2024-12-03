import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchofficeModel } from 'src/app/core/models/branchoffice.model';
import { BusinessModel } from 'src/app/core/models/business.model';

@Component({
  selector: 'app-form-branchoffice',
  templateUrl: './form-branchoffice.component.html',
  styleUrls: ['./form-branchoffice.component.scss'],
})
export class FormBranchofficeComponent implements OnInit {

  @Input() title: string = '';
  @Input() isUpdate = false;
  @Input() branchofficeData?: BranchofficeModel;
  @Output() ngBranchofficeData = new EventEmitter<BranchofficeModel>();
  @Input() business?: BusinessModel;
  branchofficeForm?: FormGroup;
  isSubmit = false;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    console.log(this.branchofficeData)
    console.log(this.branchofficeForm?.value.name)
    this.initForm();
  }

  downloadFileQr(){
    let link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'http://localhost:8080/public/' + `${this.branchofficeData?.name}` + ".png");
    link.setAttribute('download', `${this.branchofficeData?.name}`+ ".png");
    document.body.appendChild(link);
    link.click();
    link.remove();
}

  
  initForm() {
    this.branchofficeForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      nameManager: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      publicPath: [`${this.business?.name}/`, []],
      active: ['', Validators.compose([Validators.required])]
    });
    this.branchofficeForm.controls['publicPath'].disable();
    //this.branchofficeForm.branchofficeReult

    this.branchofficeForm.controls['name'].valueChanges.subscribe((value : string) => {
      console.log('Cambio el valor ', value );
      this.branchofficeForm?.controls['publicPath'].patchValue(`${this.business?.name}/${value.split(' ').join('-')}`)
      //this.branchofficeForm?.controls['publicPath'].updateValueAndValidity();
      console.log(this.branchofficeForm?.value)
    })
    
    if (this.isUpdate) {
        this.setDataBranchoffice(this.branchofficeData!);
    }
  } 

  onSubmit(branchofficeForm: FormGroup) {
    if (branchofficeForm.valid) {
      console.log(branchofficeForm.value);
      let branchofficeReult = this.branchofficeForm?.value;
      branchofficeReult.publicPath = this.branchofficeForm?.controls['publicPath'].value;
      this.ngBranchofficeData.emit(branchofficeReult);
    }
  }

  errorHandling(control: string, error: string) {
    return this.branchofficeForm?.controls[control].hasError(error);
  }

        /**
   * Cuando es actualizar, contruye el Reactive Form con datos que
   * provienen del componente padre
   * @param branchofficeModel
   */
  setDataBranchoffice(branchofficeModel: BranchofficeModel): void{
    this.branchofficeForm?.get('name')?.setValue(branchofficeModel.name);
    this.branchofficeForm?.get('nameManager')?.setValue(branchofficeModel.nameManager);
    this.branchofficeForm?.get('address')?.setValue(branchofficeModel.address);
    this.branchofficeForm?.get('phone')?.setValue(branchofficeModel.phone);
    this.branchofficeForm?.get('email')?.setValue(branchofficeModel.email);
    this.branchofficeForm?.get('active')?.setValue(branchofficeModel.active);
    this.branchofficeForm?.get('publicPath')?.setValue(branchofficeModel.publicPath);
    this.branchofficeForm?.get('urlQr')?.setValue(branchofficeModel.urlQr);
    this.branchofficeForm?.updateValueAndValidity();
  }

}