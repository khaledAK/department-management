import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { DepartmentService } from '../../service/deppartment.service';
import { DepartmentModel } from '../../shared/department.model';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../../service/employee.service';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  _departments: DepartmentModel[] = [];
  constructor(public _departmentService: DepartmentService, private _router:Router, 
    public _employeeService: EmployeeService) { }

  ngOnInit() {
    if(this._employeeService.getCurrentEmployee().roleId == 1) {
      this._departmentService.getManagerDepartments().subscribe(response=>{
        this._departmentService.setDepartments(response.departments);      
      })
    } else if(this._employeeService.getCurrentEmployee().roleId == 2) {
      this._departmentService.getAllDepartments().subscribe(response => {
        this._departmentService.setDepartments(response.departments)
      })
    }
    this._departmentService.departmentsEmitter.subscribe(departments => {
      this._departments = departments;
    });
  }

  openDepartment(department) {
    this._router.navigate(['/department', department])
  }
}
