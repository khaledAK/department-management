import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './employee/profile/profile.component';
import { LoginActivate } from './shared/login.activated';
import { NotauthorizedComponent } from './notauthorized/notauthorized.component';
import { IsLoggedIn } from './shared/isloggedin,activate';
import { AdminManager } from './shared/admin-manager.activate';
import { NewEmployeeComponent } from './employee/employee-list/new-employee/new-employee.component';


const appRoutes: Routes = [
    {path:"", redirectTo:"login", pathMatch:'full'},
    {path:"profile", component:ProfileComponent, canActivate:[AdminManager, LoginActivate]},
    {path:"employees", children:[
        {path:"", component:EmployeeListComponent, canActivate:[LoginActivate], pathMatch:'full'},
        {path:"new-employee", component: NewEmployeeComponent, canActivate:[LoginActivate]}
    ]},
    {path:"departments", component:DepartmentListComponent, canActivate:[AdminManager, LoginActivate]},
    {path:"department" , component:DepartmentComponent, canActivate:[LoginActivate]},
    {path:"login", component:LoginComponent, canActivate:[IsLoggedIn]},
    {path:"403" , component:NotauthorizedComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})

export class AppRoutingModule {

}