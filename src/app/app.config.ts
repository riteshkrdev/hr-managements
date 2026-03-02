import { ApplicationConfig, provideBrowserGlobalErrorListeners,inject } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Materials from '@primeuix/themes/material';
import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { toastInterceptor } from './interceptors/toast.interceptor';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
  withInterceptors([toastInterceptor])),
    MessageService,
    ConfirmationService,
    providePrimeNG({
            theme: {
                preset: Materials
            }
        }),
  ]
};
