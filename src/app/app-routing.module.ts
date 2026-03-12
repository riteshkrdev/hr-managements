import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layout/admin';

const routes: Routes = [
  {
        path: '',
        component: AdminComponent,
        children: [
          {
            path: '',
            redirectTo: '/dashboard',
            pathMatch: 'full'
          },
          {
            path: 'dashboard',
            loadComponent: () => import('./pages/dashboard/dashboard.component')
          },
          {
            path: 'employees',
            loadComponent: () => import('./pages/employee-page/employee-page').then((m) => m.EmployeePage)
          },
          {
            path: 'departments',
            loadComponent: () => import('./pages/departments/departments.component').then((m) => m.DepartmentsComponent)
          },
          {
            path: 'projects',
            loadComponent: () => import('./pages/projects/projects.component').then((m) => m.ProjectsComponent)
          }
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
