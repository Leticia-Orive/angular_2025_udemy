import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,  FormArray } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder);
  FormUtils = FormUtils;

  //me creo el formulario
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array(
      [
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ],
    //para que por lo menos tenga dos juegos o elementos
    Validators.minLength(2)
  )
  });
  //me creo un getter para los favoritos y me permite invocar y regresar lo que necesito
  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }
  //metodo para agregar un nuevo juego
  isValidFieldInArray(formArray: FormArray, index: number) {
    return (formArray.controls[index].errors && formArray.controls[index].touched);

  }
}
