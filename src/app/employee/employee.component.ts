import { Component, OnInit, Input } from '@angular/core';
import { EmployeeModel } from '../shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @Input() employee: EmployeeModel;
  constructor() { }
  
  ngOnInit() {
  }

}
