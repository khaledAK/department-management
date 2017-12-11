import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { DepartmentService } from '../../service/deppartment.service';
import { DepartmentModel } from '../../shared/department.model';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';
import { EmployeeService } from '../../service/employee.service';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  _departments: DepartmentModel[] = [];
  deletedDepartments: number[] = [];
  constructor(public _departmentService: DepartmentService, 
    private _router:Router, public _employeeService: EmployeeService, private modalService: NgbModal) { }

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

  editDepartment(idx) {
    const modalRef = this.modalService.open(EditDepartmentComponent);
  }

  deleteDepartment(department) {
    let idx = this.deletedDepartments.indexOf(department.id);
    if(idx < 0) this.deletedDepartments.push(department.id);
    else this.deletedDepartments.splice(idx , 1);
  }

  deleteDepartments() {
    this._departmentService.deleteDepartments(this.deletedDepartments).subscribe(res => {
      this.ngOnInit();
    })
  }

  foo() {
    console.log("A")
    this._router.navigate(['createnewemployee'])
  }
}
