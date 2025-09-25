import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";



export class FormUtils {

  //Extraemos un metodo para que no se repita el codigo
  static getTextError(errors: ValidationErrors){
    console.log(errors);
    /**
     * {
     * pattern:
     *  {requiredPattern: '([a-zA-Z]+) ([a-zA-Z]+)', actualValue: 'asdasd'}}
     * }
    */
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es obligatorio';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El valor mínimo es ${errors['min'].min}`;
          case 'email':
            return 'El valor ingresado no parece un correo electrónico';
            case 'pattern':
              if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
                return 'El valor ingresado no luce como un correo electrónico';
              }
              return 'Error de patrón contra expresión regular';

            default:
              return `Error desconocido ${key}`;
      }
    }
    return null;

  }

  //Expresiones regulares
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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

    return FormUtils.getTextError(errors);
  }
  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (formArray.controls[index].errors && formArray.controls[index].touched);

  }

  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    if (formArray.controls.length === 0) return null;
    const errors = formArray.controls[index].errors ?? {};
    return FormUtils.getTextError(errors);
  }
}
