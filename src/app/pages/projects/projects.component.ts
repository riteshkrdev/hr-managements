import { Component, inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../model/project.model';
import { ProjectService } from '../../services/project.service';
import { ProjectSharedModule } from './project.shared.module';
import { AddProject } from './add-project/add-project';

@Component({
    selector: 'app-projects',
    imports: [ProjectSharedModule],
    templateUrl: './projects.component.html',
    styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit, AfterViewInit {
    readonly dialog = inject(MatDialog);
    private projectService = inject(ProjectService);

    projects = new MatTableDataSource<Project>([]);
    loading = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    displayedColumns = ['id', 'name', 'department', 'status', 'budget', 'deadline', 'actions'];

    ngOnInit(): void {
        this.loadProjects();
    }

    ngAfterViewInit(): void {
        this.projects.paginator = this.paginator;
    }

    private loadProjects(): void {
        this.loading = true;
        this.projectService.getAll().subscribe({
            next: (data) => {
                this.loading = false;
                this.projects.data = data;
            },
            error: (err) => {
                this.loading = false;
                console.error('Error loading projects', err);
            }
        });
    }

    addNewProject(): void {
        const ref = this.dialog.open(AddProject, { data: null });
        ref.afterClosed().subscribe(result => {
            if (result) this.loadProjects();
        });
    }

    editProject(proj: Project): void {
        const ref = this.dialog.open(AddProject, { data: proj });
        ref.afterClosed().subscribe(result => {
            if (result) this.loadProjects();
        });
    }

    delete(id: string): void {
        this.projectService.delete(id).subscribe(() => this.loadProjects());
    }

    statusColor(status: string): string {
        switch (status) {
            case 'active': return 'primary';
            case 'completed': return 'accent';
            case 'on-hold': return 'warn';
            default: return 'primary';
        }
    }
}
