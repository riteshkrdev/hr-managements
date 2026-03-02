import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class ConfirmService {

  constructor(private confirmation: ConfirmationService,private toast : ToastService) {}

  confirmDelete(callback: () => void, message?: string) {
    this.confirmation.confirm({
      header: 'Confirm Delete',
      message: message || 'Are you sure you want to delete this record?',
      icon: 'pi pi-exclamation-triangle',

    acceptLabel: 'Delete',
    rejectLabel: 'Cancel',

    acceptButtonStyleClass: 'p-button-danger',
    rejectButtonStyleClass: 'p-button-secondary',
       accept:callback,

    reject: () => {
      this.toast.info('Delete Cancelled');
    }
    });
  }

  confirmUpdate(callback: () => void, message?: string) {
    this.confirmation.confirm({
      header: 'Confirm Save',
      message: message || 'Are you sure you want to save this record?',
      icon: 'pi pi-exclamation-triangle',

    acceptLabel: 'Save',
    rejectLabel: 'Cancel',

    acceptButtonStyleClass: 'p-button-info',
    rejectButtonStyleClass: 'p-button-secondary',
       accept:callback,

    reject: () => {
      this.toast.info('Save Cancelled');
    }
    });
  }

  confirmAction(options: {
    header?: string;
    message: string;
    icon?: string;
    accept: () => void;
  }) {
    this.confirmation.confirm({
      header: options.header || 'Confirmation',
      message: options.message,
      icon: options.icon || 'pi pi-question-circle',
      accept: options.accept
    });
  }
}