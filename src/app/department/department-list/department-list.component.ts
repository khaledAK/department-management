import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
 
import { DepartmentService } from '../../service/deppartment.service';
import { DepartmentModel } from '../../shared/department.model';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';


@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  _departments: DepartmentModel[] = [];
  constructor(private _departmentService: DepartmentService, private modalService: NgbModal) { }

  ngOnInit() {
    this._departments = this._departmentService.getDepartments();

    if(!this._departments.length)
      this._departmentService.getManagerDepartments().subscribe(response=>{
        console.log(response)
        this._departmentService.setDepartments(response.departments);      
      })
    this._departmentService.departmentsEmitter.subscribe(departments => {
      this._departments = departments;
    });
  }

  editDepartment(idx) {
    const modalRef = this.modalService.open(EditDepartmentComponent);
  }

}
