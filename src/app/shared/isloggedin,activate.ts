import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot , RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable';

import { EmployeeService } from '../service/employee.service';



@Injectable()
export class IsLoggedIn implements CanActivate {
  constructor(private employeeService: EmployeeService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (this.employeeService.getCurrentEmployee().roleId == 1) {
      this.router.navigate(['/manager/profile']);
    } else if(this.employeeService.getCurrentEmployee().roleId  == 2) {
        this.router.navigate(['/adminstrator/profile']);
    }
    return true;
  }
}