import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../Utils/firebasecodeerror';

@Injectable({
  providedIn: 'root',
})
export class FirebaseCodeErrorService {
  constructor() {}

  firebaseCodeError(code: string) {
    switch (code) {
      case FirebaseCodeErrorEnum.EmailAlreadyExistsUse:
        return 'El usuario ya existe';
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La contraseña es muy debil';
      case FirebaseCodeErrorEnum.Usernotfound:
        return 'El usuario no existe';
      case FirebaseCodeErrorEnum.Wrongpassword:
        return 'La contraseña es incorrecta';
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'Correo invalido';
      default:
        return 'Error desconocido';
    }
  }
}
