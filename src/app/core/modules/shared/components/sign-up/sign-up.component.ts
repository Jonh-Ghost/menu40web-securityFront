import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  @Input() title: string = '';
  @Input() saveBtnText = 'Enviar'; 
  @Output() data = new EventEmitter<any>();
  isInputPassword = true;
  signUpForm?: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  } 

  initForm() {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    }); 
  } 

  onSubmit(signUpForm: FormGroup) {
    console.log(this.signUpForm?.valid);
    console.log(this.signUpForm?.value); 
    if (signUpForm.valid) {
      this.data.emit(signUpForm.value);
    }
  }

  errorHandling(control: string, error: string) {
    return this.signUpForm?.controls[control].hasError(error);
  }

}
