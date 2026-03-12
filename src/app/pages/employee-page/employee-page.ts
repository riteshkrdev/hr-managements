import { Component, OnInit,ChangeDetectorRef,inject,ViewChild,AfterViewInit} from '@angular/core';
import { FasadeService } from '../../services/fasade.service';
import { Employee } from '../../model/employee.model';
import { EmplyeeSharedModule } from './employee.shared.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { AddEmployee } from './add-employee/add-employee';
// import { ConfirmService } from '../service/confirm.service';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-employee-page',
  imports: [EmplyeeSharedModule],
  templateUrl: './employee-page.html',
  styleUrl: './employee-page.css',
})
export class EmployeePage implements OnInit, AfterViewInit {
  // employees! : Employee[]
  readonly dialog = inject(MatDialog);
  employees = new MatTableDataSource<Employee>([])
  loading: boolean = false;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  // isEdit:boolean = false;
  // currentEmployee:Employee = {
  //   id: crypto.randomUUID(),
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   department: '',
  //   salary: 0,
  //   active: true
  // };
  employeeForm!:FormGroup;
  private employeeService = inject(FasadeService);
  // private cdr = inject(ChangeDetectorRef);
  constructor(private fb: FormBuilder){}
  // ,private confirmService:ConfirmService,

  ngOnInit() {
    this.loadEmployees();
    this.initialForm();
    
}
ngAfterViewInit(){
   this.employees.paginator = this.paginator;
}

initialForm(){
  this.employeeForm = this.fb.group({
    id: [crypto.randomUUID(),],
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    department:['',Validators.required],
    salary: [0, [Validators.required, Validators.min(1)]],
    active: [true]
  })
}

  private loadEmployees(): void {
    this.loading = true;

    this.employeeService.getAll().subscribe({
      next: (data) => {
      
    this.loading = false;
    this.employees.data = data;
   
    
      },
      error: (err) => {
    this.loading = false;
    console.error('Error loading employees', err);
 
        // this.loading = false
        
      },
      complete:() =>{
        // this.cdr.detectChanges();
      }

    });
  }
  onSaveEmployee(){

//     if(this.employeeForm.invalid){
//       this.employeeForm.markAllAsTouched();
//       return
//     }
//     this.confirmService.confirmUpdate(() => {

//       const employee = this.employeeForm.value
//       if(this.isEdit){
//         this.employeeService.update(employee).subscribe(data => {
//           console.log(data)
//           this.afterSaveEmployee()
//         })
//       }else{
//         this.employeeService.create(employee).subscribe(data => {
//           console.log(data)
//           this.afterSaveEmployee()
//         })
//       }
//     })
  }

  
//   afterSaveEmployee(){
//      this.displayDialog = false;
//     this.initialForm();
//     this.loadEmployees()
//   }
addNewEmployee(){
  const newDialog = this.dialog.open(AddEmployee);
  newDialog.afterClosed().subscribe(data => {
    console.log(data)
     this.loadEmployees()
  })
}
editEmployee(employee:Employee){
  
  this.employeeForm.patchValue({...employee})
  const newDialog = this.dialog.open(AddEmployee,{
    data: this.employeeForm.value
  })
  newDialog.afterClosed().subscribe(data => {
    console.log(data)
     this.loadEmployees()
  })
}
// onDialogClose(){
//   console.log('On Close')
//   this.toast.info(
//   this.isEdit ? 'Changes discarded' : 'Employee creation canceled'
// );
//   this.isEdit = false;
//   this.displayDialog = false;
//   this.initialForm();

// }
delete(id:string | number){
  // this.confirmService.confirmDelete(() => {

    this.employeeService.delete(id).subscribe(data =>{
      console.log(data)
      this.loadEmployees()
    })
  // })
}

}
