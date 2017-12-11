import { Component, OnInit } from '@angular/core';
import { DepartmentModel } from '../../../shared/department.model';
import { EmployeeModel } from '../../../shared/employee.model';
import { EmployeeService } from '../../../service/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  public visible = false;
  public visibleAnimate = false;
  department;
  parent;
  email;
  firstName;
  lastName;
  mobileNumber;
  password;
  role = 'Employee';
  errors;

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit() {
  }

  selectRole(role) {
    this.role = role;
  }
  createNewEmployee() {
    let employee :EmployeeModel = new EmployeeModel();
    employee.firstName = this.firstName;
    employee.lastName = this.lastName;
    employee.departmentId = this.department.id;
    employee.mobileNumber = this.mobileNumber;
    employee.role = this.role;
    employee.email = this.email;
    employee.password = this.password;
    employee.managerId = this.department.managerId;
    this._employeeService.save(employee).subscribe(res => {
      this.parent.ngOnInit();
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.role  = 'Employee';
      this.mobileNumber = "";
      this.errors = [];
      this.hide();
    },
    err => {
      let errors = JSON.parse(err._body).errors;
      this.errors = errors;
    })

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
