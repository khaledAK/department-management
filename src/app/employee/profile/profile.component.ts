import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from '../../shared/employee.model';
import { EmployeeService } from '../../service/employee.service';
import { DepartmentService } from '../../service/deppartment.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private _employee: EmployeeModel;
  errors;

  constructor(private _employeeService: EmployeeService, private _departmentService: DepartmentService) { }

  ngOnInit() {
    this._employee = this._employeeService.getCurrentEmployee();
    if(!this._departmentService.getDepartments().length)
      this._departmentService.getManagerDepartments().subscribe(response=>{
        this._departmentService.setDepartments(response.departments);      
      })
  }


  updateProfile() {
    
    this._employeeService.update(this._employee)
      .subscribe(response => {
        this.errors = null;
        this._employeeService.setCurrentEmployee(this._employee);
        window.alert("Information Updated Successfully")
      },
      err => {
        let errors = JSON.parse(err._body).errors;
        this.errors = errors;
      }
    
    );
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

}
