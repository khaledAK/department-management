import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  departments: DepartmentModel[] = [];
  toggle = {};
  deleted: number[] = [];
  employees = {};
  filtered = {};

  selectedEmployee: EmployeeModel;

  constructor(public _employeeService: EmployeeService, private router: Router,  private _departmentService: DepartmentService) { }

  ngOnInit() {
    if(this._employeeService.getCurrentEmployee().roleId == 1) {
      this._departmentService.getManagerDepartments().subscribe (res => {
        this._departmentService.setDepartments(res.departments);
      })
    } else if(this._employeeService.getCurrentEmployee().roleId == 2) {
      this._departmentService.getAllDepartments().subscribe (res => {
        this._departmentService.setDepartments(res.departments);
      })
    }

    this._departmentService.departmentsEmitter.subscribe(departments => {
      this.departments.splice(0 , this.departments.length);
      this.deleted.splice(0 , this.deleted.length);
      departments.map(department => {
        this.departments.push(new DepartmentModel().toDepartment(department));
        this._departmentService.getAllDepartmentEmployees(department.id).subscribe(response => {
          this.employees[department.id] = response.employees;
        })
      })
    })
  }
  openOrHideDepartment(department) {
    if(this.toggle[department.id])
      this.toggle[department.id] = false;
    else {
      this.departments.map(department => {
        this.toggle[department.id] = false;
      })
      this.toggle[department.id] = true;
    }
  }
  

  deleteEmployees() {
    this._employeeService.deleteFromDepartment(this.deleted)
    .subscribe(response => {
      this.ngOnInit();
    });
  }

  deleteForever() {
    this._employeeService.delete(this.deleted).subscribe(response => {
      this.ngOnInit();
    })
  }

  searchByFirstName(e) {
    this.departments.map(department=> {
      this.employees[department.id].map(emp => {
        this.filtered[emp.id] = emp.firstName.toLowerCase().search("[a-zA-Z]*(" + e.value.toLowerCase() + ")[a-zA-Z]*")
      })
    })
  }
  openOrHideEmployee(employee , department) {
    this.openOrHideDepartment(department);
    this.selectedEmployee = employee;
  }

  deleteOrNotDelete(employee , department) {
    
    let idx = this.deleted.indexOf(employee.id);
    if(idx < 0)
      this.deleted.push(employee.id)
    else 
      this.deleted.splice(idx , 1);
  }



}