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

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit() {
  }

}
