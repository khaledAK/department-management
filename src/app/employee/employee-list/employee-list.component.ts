import { Component, OnInit, Input } from '@angular/core';
import { EmployeeModel } from '../../shared/employee.model';
import { EmployeeService } from '../../service/employee.service';
import { DepartmentService } from '../../service/deppartment.service';
import { DepartmentModel } from '../../shared/department.model';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeModel[];
  selectedEmployee: EmployeeModel;
  deleted: boolean[] = [];
  filtered: boolean[] = [];



  employeesDepartments: DepartmentModel[] = [];

  constructor(private _employeeService: EmployeeService, private _departmentService: DepartmentService) { }

  ngOnInit() {
    this._employeeService.getAllEmployees().subscribe(response => {
      this._employeeService.setEmployees(response);
      this.initDeleted();
      this.initFiltered();
    });
 
    this._employeeService.employeesEmitter.subscribe(
      (employees:EmployeeModel[]) => {
        this.employees = employees;
        
        this.employeesDepartments.splice(0 , this.employeesDepartments.length);
        let departments = this._departmentService.getDepartments();
        this.employees.map(employee => {
          for(let i = 0; i < departments.length; i++) {
            if(departments[i].id == employee.departmentId) {              
              this.employeesDepartments.push(new DepartmentModel().toDepartment(departments[i]));
              break;
            }
          }
        });        
      }
    );
    this.initDeleted();
    this.initFiltered();
  }

  showEmployee(idx: number) {
    this.selectedEmployee = this.employees[idx];
  }

  toggleDelete(i) {
    this.deleted[i] = !this.deleted[i];
  }

  deleteEmployees(){
    let ids: number[] = [];
    for(let i = 0; i < this.deleted.length; i ++) {
      if(this.deleted[i]) {
        ids.push(this.employees[i].id);
      }
    }

    this._employeeService.delete(ids)
      .subscribe(response => {
        this._employeeService.getAllEmployees().subscribe(response => {
          this._employeeService.setEmployees(response);
          this.initDeleted()
          this.initFiltered();
        });
      });
  }

  initDeleted() {
    for(let i of this.deleted) 
      i = false;
    let diffSize = this.employees.length - this.deleted.length;
    for(let i = 0; i < diffSize; i ++)  {
      this.deleted.push(false);
    }
  }
  initFiltered() {
    for(let i of this.filtered) 
      i = true;
    let diffSize = this.employees.length - this.filtered.length;
    for(let i = 0; i < diffSize; i ++)  {
      this.filtered.push(true);
    }
  }
  searchByFirstName(e) {
    // console.log(e)
    for(let i = 0; i < this.employees.length; i ++) {
      if(this.employees[i].firstName.toLowerCase().search("[a-zA-Z]*(" + e.value.toLowerCase() + ")[a-zA-Z]*")) {
        this.filtered[i] = false;
      } else {
        this.filtered[i] = true;
      }
    }
  }

}
