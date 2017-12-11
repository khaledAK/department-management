import { Injectable } from '@angular/core'
import { Router, CanActivate, ActivatedRouteSnapshot , RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable';

import { EmployeeService } from '../service/employee.service';



@Injectable()
export class ManagerActivate implements CanActivate {
  constructor(private employeeService: EmployeeService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.employeeService.getCurrentEmployee().id) {
      this.router.navigate(['/login']);
    }
    if(this.employeeService.getCurrentEmployee().roleId != 1) {
        this.router.navigate(['403'])
    }
    return true;
  }
}