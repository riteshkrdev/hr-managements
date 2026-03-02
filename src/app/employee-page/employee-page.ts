import { Component, OnInit,ChangeDetectorRef} from '@angular/core';
import { FasadeService } from '../service/fasade.service';
import { Employee } from '../model/employee.model';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CurrencyPipe } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { Checkbox } from 'primeng/checkbox';
import { ReactiveFormsModule, FormBuilder, Validators,FormGroup } from '@angular/forms';
import { ToastService } from '../service/toast.service';
import { ConfirmService } from '../service/confirm.service';

@Component({
  selector: 'app-employee-page',
  imports: [ButtonModule, TableModule, TagModule, CurrencyPipe,Dialog,Checkbox,ReactiveFormsModule],
  templateUrl: './employee-page.html',
  styleUrl: './employee-page.css',
})
export class EmployeePage implements OnInit {
  // employees! : Employee[]
  employees: Employee[] = [];
  loading: boolean = false;
  isEdit:boolean = false;
  currentEmployee:Employee = {
    id: crypto.randomUUID(),
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    salary: 0,
    active: true
  };
  employeeForm!:FormGroup;
  displayDialog:boolean = false;
  // private employeeService = inject(EmployeeService);
  constructor(private employeeService:FasadeService,private cdr : ChangeDetectorRef,private fb: FormBuilder,private confirmService:ConfirmService,private toast : ToastService){}

  ngOnInit() {
    this.loadEmployees();
    this.initialForm();
    
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
    this.employees = data;
    
      },
      error: (err) => {
    this.loading = false;
    console.error('Error loading employees', err);
 
        // this.loading = false
        
      },
      complete:() =>{
        this.cdr.detectChanges();
      }

    });
  }
  onSaveEmployee(){

    if(this.employeeForm.invalid){
      this.employeeForm.markAllAsTouched();
      return
    }
    this.confirmService.confirmUpdate(() => {

      const employee = this.employeeForm.value
      if(this.isEdit){
        this.employeeService.update(employee).subscribe(data => {
          console.log(data)
          this.afterSaveEmployee()
        })
      }else{
        this.employeeService.create(employee).subscribe(data => {
          console.log(data)
          this.afterSaveEmployee()
        })
      }
    })
    

  }
  afterSaveEmployee(){
     this.displayDialog = false;
    this.initialForm();
    this.loadEmployees()
  }
addNewEmployee(){
  this.displayDialog = true
}
editEmployee(employee:Employee){
  this.isEdit = true;
  this.displayDialog = true;
  // this.currentEmployee = {...employee}
  this.employeeForm.patchValue({...employee})
  console.log(employee, this.employeeForm.value)
}
onDialogClose(){
  console.log('On Close')
  this.toast.info(
  this.isEdit ? 'Changes discarded' : 'Employee creation canceled'
);
  this.isEdit = false;
  this.displayDialog = false;
  this.initialForm();

}
delete(id:string | number){
  this.confirmService.confirmDelete(() => {

    this.employeeService.delete(id).subscribe(data =>{
      console.log(data)
      this.loadEmployees()
    })
  })
}

}
