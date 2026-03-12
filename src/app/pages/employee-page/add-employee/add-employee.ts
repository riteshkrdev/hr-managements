import { Component,inject,OnInit} from '@angular/core';
import { EmplyeeSharedModule } from '../employee.shared.module';
import { FormBuilder,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FasadeService } from 'src/app/services/fasade.service';
import { Employee } from 'src/app/model/employee.model';
import { ConfirmService } from 'src/app/services/confirm.service';

@Component({
  selector: 'app-add-employee',
  imports: [EmplyeeSharedModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.scss',
})
export class AddEmployee implements OnInit {
  isEdit:boolean = false;
  private data = inject(MAT_DIALOG_DATA);
  private fb = inject(FormBuilder);
  private employeeService = inject(FasadeService)
  private confirmService = inject(ConfirmService)
  dialogRef = inject(MatDialogRef<AddEmployee>);

  employeeForm = this.fb.group({
    id: [crypto.randomUUID(),],
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    department:['',Validators.required],
    salary: [0, [Validators.required, Validators.min(1)]],
    active: [true]
  })

  ngOnInit(){
    if(this.data){
      this.isEdit = true;
      this.employeeForm.patchValue(this.data)
    }
  }
  

  onDialogClose(){
    this.dialogRef.close()
  }

  onSaveEmployee(){
    
      const employee = this.employeeForm.value as Employee;
      if(this.isEdit){
        this.dialogRef.close('saved')
        this.confirmService.confirmUpdate(() => {
        this.employeeService.update(employee).subscribe(data => {
          console.log(data)
          // this.afterSaveEmployee()
        })}, 'Are You sure to save data?')
      }else{
        this.employeeService.create(employee).subscribe(data => {
          console.log(data)
          this.dialogRef.close('saved')
          // this.afterSaveEmployee()
        })
      }
  }

}
