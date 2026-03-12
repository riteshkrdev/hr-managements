import { Injectable,inject } from '@angular/core';
import { Employee } from '../model/employee.model';
import { of,Observable } from 'rxjs';
import { withToast } from './statelessToast';
import { ToastService } from './toast.service';
import { MOCK_EMPLOYEES } from './mock.employee';

@Injectable({ providedIn: 'root' })
export class EmployeeStateService {
  private toast = inject(ToastService);
  private employees: Employee[] = [...MOCK_EMPLOYEES];


  getAll() {
    return of(this.employees).pipe(withToast(this.toast, 'Data Loaded Successfully'));
    // return of(this.employees)
  }

  create(emp: Employee) {
    this.employees.unshift(emp);
    // this.employees = [emp,...this.employees]
    return of(emp).pipe(withToast(this.toast, 'Created Successfully'));
    // return of(emp)

  }

  update(emp: Employee) {
    this.employees = this.employees.map(e =>
      e.id === emp.id ? emp : e
    );
    // return of(emp)
    return of(emp).pipe(withToast(this.toast, 'Updated Successfully'));

  }

  delete(id: number | string): Observable<void>{
    this.employees = this.employees.filter(e => e.id !== id);
    // return of(void 0)
    return of(void 0).pipe(withToast(this.toast, 'Deleted Successfully'));

  }
}

