import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentService } from '../../../services/department.service';
import { Department } from '../../../model/department.model';
import { DepartmentSharedModule } from '../department.shared.module';

@Component({
    selector: 'app-add-department',
    imports: [DepartmentSharedModule],
    template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Edit Department' : 'Add Department' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="dialog-form">
        <mat-form-field appearance="outline">
          <mat-label>Department Name</mat-label>
          <input matInput formControlName="name" placeholder="e.g. Engineering" />
          <mat-error *ngIf="form.get('name')?.hasError('required')">Name is required</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Manager</mat-label>
          <input matInput formControlName="manager" placeholder="e.g. Alice Johnson" />
          <mat-error *ngIf="form.get('manager')?.hasError('required')">Manager is required</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Headcount</mat-label>
          <input matInput type="number" formControlName="headcount" placeholder="0" />
          <mat-error *ngIf="form.get('headcount')?.hasError('min')">Must be at least 1</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Status</mat-label>
          <mat-select formControlName="active">
            <mat-option [value]="true">Active</mat-option>
            <mat-option [value]="false">Inactive</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-raised-button color="primary" (click)="save()">
        {{ isEdit ? 'Update' : 'Save' }}
      </button>
    </mat-dialog-actions>
  `,
    styles: [`
    .dialog-form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      min-width: 340px;
      padding-top: 0.5rem;
    }
    mat-form-field { width: 100%; }
  `]
})
export class AddDepartment {
    private fb = inject(FormBuilder);
    private deptService = inject(DepartmentService);
    private dialogRef = inject(MatDialogRef<AddDepartment>);

    isEdit = false;
    form!: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Department | null) {
        this.isEdit = !!data;
        this.form = this.fb.group({
            id: [data?.id ?? crypto.randomUUID()],
            name: [data?.name ?? '', Validators.required],
            manager: [data?.manager ?? '', Validators.required],
            headcount: [data?.headcount ?? 1, [Validators.required, Validators.min(1)]],
            active: [data?.active ?? true],
        });
    }

    save(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const dept: Department = this.form.value;
        const action$ = this.isEdit ? this.deptService.update(dept) : this.deptService.create(dept);
        action$.subscribe(() => this.dialogRef.close(true));
    }
}
