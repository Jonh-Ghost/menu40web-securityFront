import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, SelectControlValueAccessor, Validators } from '@angular/forms';
import { BusinessModel } from 'src/app/core/models/business.model';

@Component({
  selector: 'app-form-adm-business',
  templateUrl: './form-adm-business.component.html',
  styleUrls: ['./form-adm-business.component.scss']
})
export class FormAdmBusinessComponent implements OnInit {
  
  @Input() title: string = '';
  @Output() data = new EventEmitter<any>();
  isInputPassword = true;
  admBusinessForm?: FormGroup;

  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm(); 
  }

  initForm() {
    this.admBusinessForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      surnames: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit(admBusinessForm: FormGroup) {
    if (admBusinessForm.valid) {
      this.data.emit(admBusinessForm.value);
    }
  }

  errorHandling(control: string, error: string) {
    return this.admBusinessForm?.controls[control].hasError(error);
  }

}

