import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeStateService } from './local-employee.service';
import { EmployeeService } from './employee.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FasadeService {
  // isJsonServerUsed:boolean = environment.useApi
  isJsonServerUsed:boolean = false;

  constructor(
    private api: EmployeeService,
    private state: EmployeeStateService
  ) {
    // this.isJsonServerUsed = false;
  }

  getAll() {
    return this.isJsonServerUsed
      ? this.api.getAll()
      : this.state.getAll();
  }

  create(emp: Employee) {
    return this.isJsonServerUsed
      ? this.api.create(emp)
      : this.state.create(emp);
  }

  update(emp: Employee) {
    return this.isJsonServerUsed
      ? this.api.update(emp)
      : this.state.update(emp);
  }

  delete(id: number | string) {
    return this.isJsonServerUsed
      ? this.api.delete(id)
      : this.state.delete(id);
  }
}
