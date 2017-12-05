import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeModel } from '../../shared/employee.model';
import { EmployeeService } from '../../service/employee.service';
import { DepartmentService } from '../../service/deppartment.service';
import { DepartmentModel } from '../../shared/department.model';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {
  email: string;
  departments: DepartmentModel[] = [];
  selectedDepartment: string = "Department";
  selectedDepartmentIndex: number = 0;
  errors;


  

  constructor(private _employeeService: EmployeeService, private router: Router, private _departmentService: DepartmentService) { }

  ngOnInit() {
    this.departments = this._departmentService.getDepartments();

    if(!this.departments.length)
      this._departmentService.getManagerDepartments().subscribe(response=>{
        this._departmentService.setDepartments(response.departments);      
      })

    this._departmentService.departmentsEmitter.subscribe(
      departments => {
      }
    )
    if(this.departments[this.selectedDepartmentIndex])
      this.selectedDepartment = this.departments[this.selectedDepartmentIndex].name;
  }

  chooseDepartment(idx: number) {
    this.selectedDepartmentIndex = idx;
    this.selectedDepartment = this.departments[this.selectedDepartmentIndex].name;
  }

  createNewEmployee() {
    this._employeeService.addEmployee(this.email , this.departments[this.selectedDepartmentIndex].id).subscribe(
      response => {
        this.router.navigate(["manager/profile"]);
      },
      err => {
        let errors = JSON.parse(err._body).errors;
        this.errors = errors;
      }
    )
  }

  back() {
    console.log("A")
    this.router.navigate(["manager/profile"]);
  }

  errorsContain(errorType) {
    let yes = false;
    if(this.errors)
      this.errors.map(error => {
        let errorField = error.arguments[0].codes[1];
        if(errorField == errorType) yes = true;
      })
    return yes;
  }
}
