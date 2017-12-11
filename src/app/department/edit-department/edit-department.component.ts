import { Component, OnInit } from '@angular/core';
import { DepartmentModel } from '../../shared/department.model';
import { DepartmentService } from '../../service/deppartment.service';
import { EmployeeModel } from '../../shared/employee.model';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {

  
  public anotherDepartment: number = -1;
  public departments: DepartmentModel[] = [];
  public currentDepartment: DepartmentModel = new DepartmentModel;
  public currentDepartmentEmployees: EmployeeModel[] = [];
  public anotherDepartmentEmployees: EmployeeModel[] = [];
  public visible = false;
  public visibleAnimate = false;
  public anotherDepartmentEmployeeSelected = -1;
  public currentDepartmentEmployeeSelected = -1;
  public anotherDepartmentName: string;

  constructor(private _departmentService: DepartmentService, private _employeeService: EmployeeService) { }
  
  ngOnInit() {
  }


  toAnotherDepartment() {
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

  init() {
    this._departmentService.getAllDepartmentEmployees(this.currentDepartment.id).subscribe(
      res => {
        this.currentDepartmentEmployees.splice(0 , this.currentDepartmentEmployees.length);
        res.employees.map(employee => {
          this.currentDepartmentEmployees.push(new EmployeeModel().toEmployee(employee));
        })
      }
    )
  }

  chooseDepartment(idx: number) {
    this.anotherDepartment = idx;
    this.anotherDepartmentName = this.departments[idx].name;
    this.loadAnotherDepartmentEmployees();
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

  public show(idx , departments): void {
    this.anotherDepartmentName = 'Choose Department';
    this.anotherDepartmentEmployees.splice(0 , this.anotherDepartmentEmployees.length);
    this.anotherDepartment = -1;
    this.currentDepartmentEmployeeSelected = this.anotherDepartmentEmployeeSelected = -1;
    this.departments = departments.slice();
    this.currentDepartment = this.departments[idx];
    this.init();
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
