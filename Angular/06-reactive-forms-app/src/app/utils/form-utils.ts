import { FormGroup } from "@angular/forms";



export class FormUtils {

  //Expresiones regulares

  //Varios metodos estaticos para reutilizar en varios formularios

  //me creo una funcion
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    //return !! this.myForm.controls[fieldName].errors le paso por la doble negacion !! para que
    //primera mente este vacio o el valor opuesto a vacio es que tenga algo
    return (form.controls[fieldName].errors && form.controls[fieldName].touched)
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;
    const errors = form.controls[fieldName].errors ?? {};
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
