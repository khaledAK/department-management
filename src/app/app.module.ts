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
import { FooterComponent } from './footer/footer.component';
import { ConfimationComponent } from './employee/employee-list/confimation/confimation.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { NotauthorizedComponent } from './notauthorized/notauthorized.component';
import { ManagerActivate } from './shared/manager.activate';
import { AdministratorActivate } from './shared/administrator.activate';
import { CreateEmployeeComponent } from './employee/employee-list/create-employee/create-employee.component';
import { IsLoggedIn } from './shared/isloggedin,activate';
import { NewDepartmentComponent } from './department/department-list/new-department/new-department.component';
import { ClickStopPropagationDirective } from './shared/click-stop-propagation.directive';


const appRoutes: Routes = [
  {path:"manager", component:ManagerComponent, canActivate:[ManagerActivate],
    children:[ 
          {path:"profile", component:ProfileComponent, canActivate:[ManagerActivate]},
          {path:"employees", component:EmployeeListComponent, canActivate:[ManagerActivate]},
          {path:"departments", component:DepartmentListComponent, canActivate:[ManagerActivate]}
        ]},
  {path:"login", component:LoginComponent, canActivate:[IsLoggedIn]},
  {path:"", redirectTo:"login", pathMatch:'full'},
  {path:"addemployee", component:NewEmployeeComponent, canActivate:[ManagerActivate]},
  {path:"administrator", component:AdministratorComponent, canActivate:[AdministratorActivate],
    children:[
      {path:"profile", component:ProfileComponent, canActivate:[AdministratorActivate]},
      {path:"employees", component:EmployeeListComponent, canActivate:[AdministratorActivate]},
      {path:"departments", component:DepartmentListComponent, canActivate:[AdministratorActivate]}
    ]} ,
  {path:"403" , component:NotauthorizedComponent},
  {path:"createnewemployee", component:CreateEmployeeComponent}
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
    FooterComponent,
    ConfimationComponent,
    AdministratorComponent,
    NotauthorizedComponent,
    CreateEmployeeComponent,
    NewDepartmentComponent,
    ClickStopPropagationDirective,
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
  providers: [EmployeeService, DepartmentService, LoginActivate, ManagerActivate, IsLoggedIn , AdministratorActivate ,TranslateService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
