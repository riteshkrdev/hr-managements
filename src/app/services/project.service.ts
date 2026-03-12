import { Injectable, inject } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Project } from '../model/project.model';
import { withToast } from './statelessToast';
import { ToastService } from './toast.service';

const MOCK_PROJECTS: Project[] = [
    { id: crypto.randomUUID(), name: 'HR Portal Redesign', department: 'Engineering', status: 'active', budget: 150000, deadline: '2026-06-30' },
    { id: crypto.randomUUID(), name: 'Talent Acquisition Drive', department: 'Human Resources', status: 'active', budget: 50000, deadline: '2026-04-15' },
    { id: crypto.randomUUID(), name: 'Brand Refresh Campaign', department: 'Marketing', status: 'on-hold', budget: 80000, deadline: '2026-08-01' },
    { id: crypto.randomUUID(), name: 'Annual Budget Review', department: 'Finance', status: 'completed', budget: 20000, deadline: '2026-03-01' },
    { id: crypto.randomUUID(), name: 'Supply Chain Optimization', department: 'Operations', status: 'active', budget: 200000, deadline: '2026-12-31' },
    { id: crypto.randomUUID(), name: 'Q2 Sales Push', department: 'Sales', status: 'active', budget: 60000, deadline: '2026-06-30' },
];

@Injectable({ providedIn: 'root' })
export class ProjectService {
    private toast = inject(ToastService);
    private projects: Project[] = [...MOCK_PROJECTS];

    getAll(): Observable<Project[]> {
        return of(this.projects).pipe(withToast(this.toast, 'Projects Loaded Successfully'));
    }

    create(proj: Project): Observable<Project> {
        this.projects.unshift(proj);
        return of(proj).pipe(withToast(this.toast, 'Project Created Successfully'));
    }

    update(proj: Project): Observable<Project> {
        this.projects = this.projects.map(p => (p.id === proj.id ? proj : p));
        return of(proj).pipe(withToast(this.toast, 'Project Updated Successfully'));
    }

    delete(id: string): Observable<void> {
        this.projects = this.projects.filter(p => p.id !== id);
        return of(void 0).pipe(withToast(this.toast, 'Project Deleted Successfully'));
    }
}
