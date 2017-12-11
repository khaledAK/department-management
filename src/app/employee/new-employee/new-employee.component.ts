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
  department: DepartmentModel;
  parent;
  errors;
  public visible = false;
  public visibleAnimate = false;

  

  constructor(private _employeeService: EmployeeService, private router: Router, private _departmentService: DepartmentService) { }

  ngOnInit() {
    
  }


  createNewEmployee() {
    this._employeeService.addEmployee(this.email , this.department.id).subscribe(
      response => {
        this.parent.ngOnInit();
        this.email = "";
        this.errors =false;
        this.hide();
      },
      err => {
        this.errors = true;
      }
    )
  }

  back() {
    this.router.navigate(["manager/profile"]);
  }

  errorsContain(errorType) {
    if(this.errors)
      return true;
    return false;
  }


  public show(department, parent): void {
    this.department = department;
    this.parent = parent;
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
}
