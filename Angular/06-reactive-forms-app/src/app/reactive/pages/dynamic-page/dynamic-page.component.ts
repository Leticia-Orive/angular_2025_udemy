import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators,  FormArray, FormControl } from '@angular/forms';
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

  //control de manera aislada
  newFavorite= new FormControl('', Validators.required);
  //newFavorite= this.fb.control( []);

  //me creo un getter para los favoritos y me permite invocar y regresar lo que necesito
  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }
  onAddToFavorites(){
    if(this.newFavorite.invalid)
      return;
      const newGame = this.newFavorite.value;
      this.favoriteGames.push(this.fb.control(newGame, Validators.required));
      this.newFavorite.reset();
  }
  onRemoveFavorite(index: number){
    this.favoriteGames.removeAt(index);
  }
  onSubmit(){
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
  }
}
