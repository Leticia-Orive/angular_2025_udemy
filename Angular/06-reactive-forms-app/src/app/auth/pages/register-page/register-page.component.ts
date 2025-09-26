import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  //!Tarea:
  fb = inject(FormBuilder);

  formUtils = FormUtils;

  myForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(FormUtils.namePattern)]],

    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)],
   [FormUtils.checkingServerResponse]],


    username: ['',
      [Validators.required,
      Validators.minLength(6),
      Validators.pattern(FormUtils.notOnlySpacesPattern),
      FormUtils.notStrider
    ]],

    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  }, {
    //lo coloco dentro de este objecto de configuracion de las validaciones
   Validators: [this.formUtils.isFieldOneEqualFieldTwo('password', 'password2')]
   //Tambien se puede poner asi
   //Validators: [FormUtils.isFieldOneEqualFieldTwo('password', 'password2')]
  });



  onSubmit() {
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }
}
