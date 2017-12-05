import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _email: string;
  private _password: string;

  constructor(private _employeeService: EmployeeService, private _router: Router) { }

  ngOnInit() {
  }

  login(): void {
    this._employeeService.login(this._email , this._password)
      .subscribe(response => {
        this._employeeService.setCurrentEmployee(response); 
        if(this._employeeService.getCurrentEmployee().roleId === 1)
          this._router.navigate(['manager/profile']);
      });
  }

}
