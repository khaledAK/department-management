import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { EmployeeService } from '../service/employee.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent { 
    constructor(public _employeeService: EmployeeService, private _router: Router){
        
    }
    
    logout() {
        this._employeeService.logout().subscribe(
            response => {
                this._employeeService.setCurrentEmployee({});
                this._router.navigate(["/login"]);
            }
        )
    }
}