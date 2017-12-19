import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeModel } from '../shared/employee.model';
import { DepartmentService } from '../service/deppartment.service';
import { DepartmentModel } from '../shared/department.model';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  public anotherDepartment: number = -1;
  public departments: DepartmentModel[] = [];
  public currentDepartment: DepartmentModel = new DepartmentModel;
  public currentDepartmentEmployees: EmployeeModel[] = [];
  public anotherDepartmentEmployees: EmployeeModel[] = [];
  public anotherDepartmentEmployeeSelected = -1;
  public currentDepartmentEmployeeSelected = -1;
  public anotherDepartmentName: string;
  public manager:EmployeeModel = new EmployeeModel();
  constructor(private route: ActivatedRoute, private _departmentService: DepartmentService,
        private _employeeService:EmployeeService) { }

  ngOnInit() {
    this.currentDepartment = new DepartmentModel().toDepartment(this.route.snapshot.params);
    if(this.currentDepartment.id) {
      this._departmentService.getDepartmentManager(this.currentDepartment.id).subscribe(res => {
        this.manager = new EmployeeModel().toEmployee(res);
      });

      this._departmentService.getAllDepartmentEmployees(this.currentDepartment.id).subscribe(res => {
        this.currentDepartmentEmployees = res.employees.slice();
      })
      if(this._employeeService.getCurrentEmployee().roleId == 2)
        this._departmentService.getAllDepartments().subscribe(res => {
          this.departments = res.departments.slice();
        })
      else 
        this._departmentService.getManagerDepartments().subscribe(res => {
          this.departments = res.departments.slice();
        })
    }
  }

  chooseDepartment(idx: number) {
    this.anotherDepartment = idx;
    this.anotherDepartmentName = this.departments[idx].name;
    this.loadAnotherDepartmentEmployees();
  }
  toAnotherDepartment() {
    console
    this.currentDepartmentEmployees[this.currentDepartmentEmployeeSelected].departmentId = 
    this.departments[this.anotherDepartment].id;
    this._employeeService.update(this.currentDepartmentEmployees[this.currentDepartmentEmployeeSelected]).subscribe(
      res => {
        this.anotherDepartmentEmployees.push(this.currentDepartmentEmployees[this.currentDepartmentEmployeeSelected]);
        this.currentDepartmentEmployees.splice(this.currentDepartmentEmployeeSelected , 1);
        this.currentDepartmentEmployeeSelected = -1;
      }
    )
  }
  
  toCurrentDepartment() {
    this.anotherDepartmentEmployees[this.anotherDepartmentEmployeeSelected].departmentId = 
      this.currentDepartment.id;
    this._employeeService.update(this.anotherDepartmentEmployees[this.anotherDepartmentEmployeeSelected]).subscribe(
      res => {
        this.currentDepartmentEmployees.push(this.anotherDepartmentEmployees[this.anotherDepartmentEmployeeSelected]);
        this.anotherDepartmentEmployees.splice(this.anotherDepartmentEmployeeSelected , 1);
        this.anotherDepartmentEmployeeSelected = -1;
      }
    )
  }

  selectCurrentDepartmentEmployee(i) {
    this.currentDepartmentEmployeeSelected = i;
  }

  selectAnotherDepartmentEmployee(i) {
    this.anotherDepartmentEmployeeSelected = i;
  }
  loadAnotherDepartmentEmployees() {
    
    this._departmentService.getAllDepartmentEmployees(this.departments[this.anotherDepartment].id).subscribe(
      res => {
        this.anotherDepartmentEmployees.splice(0 , this.anotherDepartmentEmployees.length);
        res.employees.map(employee => {
          this.anotherDepartmentEmployees.push(new EmployeeModel().toEmployee(employee));
        })
      }
    )
  }

}
