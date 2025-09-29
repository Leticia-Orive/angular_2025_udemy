// UTILIDADES COMPARTIDAS PARA FORMULARIOS REACTIVOS
// Centraliza validadores personalizados, patrones regex y manejo de errores
// Reutilizable en todos los formularios de la aplicación
import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";
import { timeout } from "rxjs";

// FUNCIÓN AUXILIAR para simular latencia de servidor
// Utilizada en validaciones asíncronas para demostrar el comportamiento real
async function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 2500);  // Simula 2.5 segundos de espera
  })
}

export class FormUtils {

  // MÉTODO CENTRAL para generar mensajes de error personalizados
  // Convierte códigos de error de Angular en mensajes amigables para el usuario
  static getTextError(errors: ValidationErrors) {
    console.log(errors);
    /**
     * Ejemplo de estructura de errores:
     * {
     *   pattern: {
     *     requiredPattern: '([a-zA-Z]+) ([a-zA-Z]+)',
     *     actualValue: 'asdasd'
     *   }
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
        case 'notStrider':
          return 'No se puede usar "strider" como nombre de usuario';
        case 'pattern':
          // Manejo específico para diferentes patrones regex
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

  // PATRONES REGEX para validaciones comunes
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';           // Nombre y apellido separados por espacio
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';  // Email válido
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';           // Solo alfanumérico, sin espacios

  // MÉTODOS ESTÁTICOS UTILITARIOS para reutilizar en múltiples formularios

  // Verifica si un campo específico tiene errores y ha sido tocado por el usuario
  // Retorna true si debe mostrarse el error en la UI
  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    // Combina dos condiciones: tiene errores Y ha sido tocado
    // Esto evita mostrar errores antes de que el usuario interactúe con el campo
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
  // VALIDADOR PERSONALIZADO a nivel de FormGroup
  // Compara dos campos para verificar que tengan el mismo valor (ej: password y confirmPassword)
  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    // Retorna una función validadora que Angular puede usar
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      // Si los valores son iguales, no hay error (return null)
      // Si son diferentes, retorna objeto con el error
      return field1Value === field2Value ? null : { passwordsNotEqual: true };
    }
  }

  // VALIDADOR ASÍNCRONO PERSONALIZADO
  // Simula validación en servidor (ej: verificar si email ya existe)
  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    console.log('validando servidor');
    await sleep(); // Simula latencia de red de 2.5 segundos

    const formValue = control.value;
    // Simula que "hola@mundo.com" ya está registrado
    if (formValue === 'hola@mundo.com') {
      return {
        emailTaken: true  // Error: email ya está en uso
      }
    }
    return null;  // No hay error
  }

  // VALIDADOR SÍNCRONO PERSONALIZADO
  // Prohíbe el uso de "strider" como nombre de usuario
  static notStrider(control: AbstractControl): ValidationErrors | null {
    console.log('validando noStrider');
    const value = control.value;

    if (value === 'strider') {
      return {
        notStrider: true  // Error: "strider" no está permitido
      }
    }
    return null;  // No hay error
  }



}
