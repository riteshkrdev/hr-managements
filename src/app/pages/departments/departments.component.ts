import { Component, inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Department } from '../../model/department.model';
import { DepartmentService } from '../../services/department.service';
import { DepartmentSharedModule } from './department.shared.module';
import { AddDepartment } from './add-department/add-department';

@Component({
    selector: 'app-departments',
    imports: [DepartmentSharedModule],
    templateUrl: './departments.component.html',
    styleUrl: './departments.component.css'
})
export class DepartmentsComponent implements OnInit, AfterViewInit {
    readonly dialog = inject(MatDialog);
    private deptService = inject(DepartmentService);

    departments = new MatTableDataSource<Department>([]);
    loading = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns = ['id', 'name', 'manager', 'headcount', 'status', 'actions'];

    ngOnInit(): void {
        this.loadDepartments();
    }

    ngAfterViewInit(): void {
        this.departments.paginator = this.paginator;
    }

    private loadDepartments(): void {
        this.loading = true;
        this.deptService.getAll().subscribe({
            next: (data) => {
                this.loading = false;
                this.departments.data = data;
            },
            error: (err) => {
                this.loading = false;
                console.error('Error loading departments', err);
            }
        });
    }

    addNewDepartment(): void {
        const ref = this.dialog.open(AddDepartment, { data: null });
        ref.afterClosed().subscribe(result => {
            if (result) this.loadDepartments();
        });
    }

    editDepartment(dept: Department): void {
        const ref = this.dialog.open(AddDepartment, { data: dept });
        ref.afterClosed().subscribe(result => {
            if (result) this.loadDepartments();
        });
    }

    delete(id: string): void {
        this.deptService.delete(id).subscribe(() => this.loadDepartments());
    }
}
