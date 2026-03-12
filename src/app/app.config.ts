import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { toastInterceptor } from './interceptors/toast.interceptor';
import { MessageService, ConfirmationService } from 'primeng/api';

// project import


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter([
      {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth-routing.module').then((m) => m.AuthRoutingModule)
  },{
    path:'',
    loadChildren:() => import('./app-routing.module').then((m) => m.AppRoutingModule)
  }
      
    ]),
    provideHttpClient(withInterceptors([toastInterceptor])),
    MessageService,
    ConfirmationService,
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
