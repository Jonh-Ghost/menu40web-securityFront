import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  @Input() title: string = '';
  @Output() data = new EventEmitter<any>();
  isInputPassword = true;
  signInForm?: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  /**
   * Inicializando el componente
   */
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit(signInForm: FormGroup) {
    if (signInForm.valid) {
      this.data.emit(signInForm.value);
    }
  }

  errorHandling(control: string, error: string) {
    return this.signInForm?.controls[control].hasError(error);
  }

}
