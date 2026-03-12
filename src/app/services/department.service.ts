import { Injectable, inject } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Department } from '../model/department.model';
import { withToast } from './statelessToast';
import { ToastService } from './toast.service';

const MOCK_DEPARTMENTS: Department[] = [
    { id: crypto.randomUUID(), name: 'Engineering', manager: 'Alice Johnson', headcount: 24, active: true },
    { id: crypto.randomUUID(), name: 'Human Resources', manager: 'Bob Smith', headcount: 8, active: true },
    { id: crypto.randomUUID(), name: 'Marketing', manager: 'Carol Williams', headcount: 12, active: true },
    { id: crypto.randomUUID(), name: 'Finance', manager: 'David Brown', headcount: 10, active: true },
    { id: crypto.randomUUID(), name: 'Operations', manager: 'Eve Davis', headcount: 15, active: false },
    { id: crypto.randomUUID(), name: 'Sales', manager: 'Frank Miller', headcount: 20, active: true },
];

@Injectable({ providedIn: 'root' })
export class DepartmentService {
    private toast = inject(ToastService);
    private departments: Department[] = [...MOCK_DEPARTMENTS];

    getAll(): Observable<Department[]> {
        return of(this.departments).pipe(withToast(this.toast, 'Departments Loaded Successfully'));
    }

    create(dept: Department): Observable<Department> {
        this.departments.unshift(dept);
        return of(dept).pipe(withToast(this.toast, 'Department Created Successfully'));
    }

    update(dept: Department): Observable<Department> {
        this.departments = this.departments.map(d => (d.id === dept.id ? dept : d));
        return of(dept).pipe(withToast(this.toast, 'Department Updated Successfully'));
    }

    delete(id: string): Observable<void> {
        this.departments = this.departments.filter(d => d.id !== id);
        return of(void 0).pipe(withToast(this.toast, 'Department Deleted Successfully'));
    }
}
