import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {

  //Para que funcione un formulario reactivo

  myForm = new FormGroup({
    //Definimos nuestro formulario
    name: new FormControl(''),
    price: new FormControl(0),
    inStorage: new FormControl(0),
  })

 }
