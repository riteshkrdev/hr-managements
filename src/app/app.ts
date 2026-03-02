import { Component, signal } from '@angular/core';
import { EmployeePage } from './employee-page/employee-page';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  imports: [EmployeePage,ToastModule,RippleModule,ConfirmDialogModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('crud-primeng');
}
