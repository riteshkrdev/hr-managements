import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';

export const toastInterceptor: HttpInterceptorFn = (req, next) => {

  const notification = inject(ToastService);

  return next(req).pipe(
    tap({
      next: (event) => {

        if (event instanceof HttpResponse &&
          ['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {

          switch (req.method) {
            case 'GET':
              notification.success('Data Loaded Successfully');
              break;
            case 'POST':
              notification.success('Created Successfully');
              break;
            case 'PUT':
              notification.success('Updated Successfully');
              break;
            case 'DELETE':
              notification.error('Deleted Successfully');
              break;
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        notification.error(
          error.error?.message || error.message
        );
      }
    })
  );
};