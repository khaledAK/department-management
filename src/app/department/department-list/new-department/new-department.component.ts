import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../service/deppartment.service';
import { DepartmentModel } from '../../../shared/department.model';

@Component({
  selector: 'app-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.css']
})
export class NewDepartmentComponent implements OnInit {


  name: string;
  managerEmail: string;
  errors;
  emailNotExsit = false;
  constructor(private _departmentService: DepartmentService) { }

  ngOnInit() {
  }

  createNewDepartment() {
    this._departmentService.save({name: this.name , managerEmail: this.managerEmail}).subscribe(res => {
      /// todo add action after adding a new department
    },
    err=> {
      let errors = JSON.parse(err._body).errors;
      this.errors = errors;
      if(err.status == 500)
        this.emailNotExsit = true;
    });
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
