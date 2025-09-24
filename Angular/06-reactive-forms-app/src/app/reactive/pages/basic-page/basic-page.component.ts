import { JsonPipe } from '@angular/common';
import { ReturnStatement } from '@angular/compiler';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {

  //Para que funcione un formulario reactivo

  //creamos una nueva property
  //fb = FormBuilder; --- IGNORE ---
  private fb = inject(FormBuilder);

  myForm: FormGroup = this.fb.group({
    //Definimos nuestro formulario con formControl
    name: ['', [Validators.required, Validators.minLength(3)]  /** Validadores sincronos */ ,/**Validadores asincronos[] */],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  })

 /**  myForm2 = this.fb.group({
    //Definimos nuestro formulario con formControl
    name: ['', [], []  /** Validadores sincronos ,Validadores asincronos[] ],*/
   // price: [0],
   // inStorage: [0],
  //})*/

  //myForm = new FormGroup({
    //Definimos nuestro formulario con formControl
   /**  name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0),

  })*/

    //me creo una funcion
    isValidField(fieldName: string): boolean | null {
      return !! this.myForm.controls[fieldName].errors //le paso por la doble negacion !! para que
      //primera mente este vacio o el valor opuesto a vacio es que tenga algo
    }

    getFieldError(fieldName: string): string | null {
      if (!this.myForm.controls[fieldName]) return null;
      const errors = this.myForm.controls[fieldName].errors ?? {};
      for (const key of Object.keys(errors)) {
        switch (key) {
          case 'required':
            return 'Este campo es obligatorio';
          case 'minlength':
            return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
          case 'min':
            return `El valor mínimo es ${errors['min'].min}`;


        }
      }
      return null;

    }

 }
