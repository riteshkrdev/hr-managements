import { tap } from 'rxjs/operators';
import { ToastService } from './toast.service';

export function withToast<T>(
  toast: ToastService,
  successMsg: string,
  errorMsg?: string
) {
  return tap<T>({
    next: () => toast.success(successMsg),
    error: (err) => toast.error(errorMsg || 'Operation Failed')
  });
}