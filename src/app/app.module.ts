import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component';
import { EmployeeComponent } from './employee/employee.component';
import { ManagerComponent } from './manager/manager.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { LoginComponent } from './login/login.component';
import { EmployeeService } from './service/employee.service';
import { ProfileComponent } from './employee/profile/profile.component';
import { DepartmentService } from './service/deppartment.service';
import { LoginActivate } from './shared/login.activated';
import { NewEmployeeComponent } from './employee/new-employee/new-employee.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { EditDepartmentComponent } from './department/edit-department/edit-department.component'

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateService , TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


const appRoutes: Routes = [
  {path:"manager", component:ManagerComponent, canActivate:[LoginActivate],
    children:[ 
          {path:"profile", component:ProfileComponent, canActivate:[LoginActivate]},
          {path:"employees", component:EmployeeListComponent, canActivate:[LoginActivate]},
          {path:"departments", component:DepartmentListComponent, canActivate:[LoginActivate]}
        ]},
  {path:"login", component:LoginComponent},
  {path:"", redirectTo:"login", pathMatch:'full'},
  {path:"addemployee", component:NewEmployeeComponent, canActivate:[LoginActivate]}
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeeComponent,
    ManagerComponent,
    EmployeeListComponent,
    DepartmentComponent,
    DepartmentListComponent,
    LoginComponent,
    ProfileComponent,
    NewEmployeeComponent,
    DropdownDirective,
    EditDepartmentComponent,
  ],
  entryComponents: [
    EditDepartmentComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule , HttpModule , RouterModule.forRoot(appRoutes), NgbModule.forRoot(), TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [EmployeeService, DepartmentService, LoginActivate,TranslateService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
