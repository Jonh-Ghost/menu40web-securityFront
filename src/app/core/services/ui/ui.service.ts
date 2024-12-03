import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  showMessage(msg: string, type: string) {
    this.snackBar.open(msg, type)
  }

  showSuccessAlert(title: string = ''): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      allowEscapeKey: true,
      allowOutsideClick: false,
    })
  }

  showConfirmAlert(title: string = '', text: string = ''): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      text: text,
      showCloseButton: true,
      showCancelButton: true,
      allowEscapeKey: true,
      allowOutsideClick: false,
      icon: 'question',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar'
    })
  }

  showErrorAlert(title: string = ''): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title: title,
      showCloseButton: true,
      allowEscapeKey: true,
      allowOutsideClick: false,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
  }

}
