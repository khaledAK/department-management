import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { EmployeeModel } from '../../../shared/employee.model';
import { EmployeeService } from '../../../service/employee.service';
import { DepartmentService } from '../../../service/deppartment.service';
import { DepartmentModel } from '../../../shared/department.model';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {
  // constructor(private _employeeService: EmployeeService, private router: Router, private _departmentService: DepartmentService) { }

  ngOnInit() {
    
  }
}
