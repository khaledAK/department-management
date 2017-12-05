import { Component } from '@angular/core'
import { Router } from '@angular/router'

import { EmployeeService } from '../service/employee.service';
import { TranslateService } from '@ngx-translate/core'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})

export class HeaderComponent { 
    constructor(private _employeeService: EmployeeService, private _router: Router, private translate: TranslateService){
        this.translate.setDefaultLang('en');
    }
    public changeLang() {
        if(this.translate.getDefaultLang() == 'fr')
            this.translate.setDefaultLang('en');
        else 
            this.translate.setDefaultLang('fr');
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