import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";
import { timeout } from "rxjs";


//funcion asincrona
async function sleep(){
  return new Promise (resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  })
}

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
            case 'emailTaken':
            return 'El correo electrónico ya fue usado';
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
  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    //devuelve una funcion
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;
      //hacemos la condicion
      return field1Value === field2Value ? null : { passwordsNotEqual: true };

      /*si esta vacio
      return null;
      pero si hay un error tenemos que devolver un objeto de configuracion para saber cual es el error
      return {
        passwordsNotEqual: true
      }*/
    }
  }

  //Validacion personalizada asincrona
  static async checkingServerResponse(control: AbstractControl):
  Promise<ValidationErrors | null> {
    console.log('validando servidor');
    await sleep(); //simula una espera de 2.5 segundos
    const formValue = control.value;
    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true
      }
    }
    return null
  }


}
