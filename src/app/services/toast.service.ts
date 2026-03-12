import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {


  // constructor(private snackBar: MatSnackBar) {}

  // showSuccess(message: string) {
  //   this.open(message, 'success-snackbar');
  // }

  // showError(message: string) {
  //   this.open(message, 'error-snackbar');
  // }

  // showWarning(message: string) {
  //   this.open(message, 'warning-snackbar');
  // }

  // showInfo(message: string) {
  //   this.open(message, 'info-snackbar');
  // }

  // private open(message: string, panelClass: string) {
  //   this.snackBar.open(message, 'Close', {
  //     duration: 3000,
  //     horizontalPosition: 'right',
  //     verticalPosition: 'top',
  //     panelClass: panelClass
  //   });
  // }


  constructor(private messageService: MessageService) {}

  success(summary: string, detail?: string) {
    this.messageService.add({
      severity: 'success',
      summary,
      detail
    });
  }

  error(summary: string, detail?: string) {
    this.messageService.add({
      severity: 'error',
      summary,
      detail
    });
  }

  info(summary: string, detail?: string) {
    this.messageService.add({
      severity: 'info',
      summary,
      detail
    });
  }

  warn(summary: string, detail?: string) {
    this.messageService.add({
      severity: 'warn',
      summary,
      detail
    });
  }

  clear() {
    this.messageService.clear();
  }
}