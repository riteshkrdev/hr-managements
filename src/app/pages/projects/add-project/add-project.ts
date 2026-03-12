import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../model/project.model';
import { ProjectSharedModule } from '../project.shared.module';

@Component({
    selector: 'app-add-project',
    imports: [ProjectSharedModule],
    template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Edit Project' : 'Add Project' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="dialog-form">
        <mat-form-field appearance="outline">
          <mat-label>Project Name</mat-label>
          <input matInput formControlName="name" placeholder="e.g. HR Portal Redesign" />
          <mat-error *ngIf="form.get('name')?.hasError('required')">Name is required</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Department</mat-label>
          <input matInput formControlName="department" placeholder="e.g. Engineering" />
          <mat-error *ngIf="form.get('department')?.hasError('required')">Department is required</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status">
            <mat-option value="active">Active</mat-option>
            <mat-option value="completed">Completed</mat-option>
            <mat-option value="on-hold">On Hold</mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Budget ($)</mat-label>
          <input matInput type="number" formControlName="budget" placeholder="0" />
          <mat-error *ngIf="form.get('budget')?.hasError('min')">Must be at least 0</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Deadline</mat-label>
          <input matInput type="date" formControlName="deadline" />
          <mat-error *ngIf="form.get('deadline')?.hasError('required')">Deadline is required</mat-error>
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
      min-width: 360px;
      padding-top: 0.5rem;
    }
    mat-form-field { width: 100%; }
  `]
})
export class AddProject {
    private fb = inject(FormBuilder);
    private projectService = inject(ProjectService);
    private dialogRef = inject(MatDialogRef<AddProject>);

    isEdit = false;
    form!: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) public data: Project | null) {
        this.isEdit = !!data;
        this.form = this.fb.group({
            id: [data?.id ?? crypto.randomUUID()],
            name: [data?.name ?? '', Validators.required],
            department: [data?.department ?? '', Validators.required],
            status: [data?.status ?? 'active'],
            budget: [data?.budget ?? 0, [Validators.required, Validators.min(0)]],
            deadline: [data?.deadline ?? '', Validators.required],
        });
    }

    save(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const proj: Project = this.form.value;
        const action$ = this.isEdit ? this.projectService.update(proj) : this.projectService.create(proj);
        action$.subscribe(() => this.dialogRef.close(true));
    }
}
