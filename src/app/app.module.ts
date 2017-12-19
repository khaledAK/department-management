import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { LoginComponent } from './login/login.component';
import { EmployeeService } from './service/employee.service';
import { ProfileComponent } from './employee/profile/profile.component';
import { DepartmentService } from './service/deppartment.service';
import { LoginActivate } from './shared/login.activated';
import { NewEmployeeComponent } from './employee/employee-list/new-employee/new-employee.component';
import { DropdownDirective } from './shared/dropdown.directive';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateService , TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { FooterComponent } from './footer/footer.component';
import { ConfimationComponent } from './confimation/confimation.component';
import { NotauthorizedComponent } from './notauthorized/notauthorized.component';
import { CreateEmployeeComponent } from './employee/employee-list/create-employee/create-employee.component';
import { IsLoggedIn } from './shared/isloggedin,activate';
import { NewDepartmentComponent } from './department/department-list/new-department/new-department.component';
import { ClickStopPropagationDirective } from './shared/click-stop-propagation.directive';
import { AdminManager } from './shared/admin-manager.activate';
import { AppRoutingModule } from './app-routing.module';


const appRoutes: Routes = [
  {path:"", redirectTo:"login", pathMatch:'full'},
  {path:"profile", component:ProfileComponent, canActivate:[AdminManager, LoginActivate]},
  {path:"employees", component:EmployeeListComponent, canActivate:[AdminManager, LoginActivate]},
  {path:"departments", component:DepartmentListComponent, canActivate:[AdminManager, LoginActivate]},
  {path:"department" , component:DepartmentComponent, canActivate:[LoginActivate]},
  {path:"login", component:LoginComponent, canActivate:[IsLoggedIn]},
  {path:"403" , component:NotauthorizedComponent}
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeeComponent,
    EmployeeListComponent,
    DepartmentComponent,
    DepartmentListComponent,
    LoginComponent,
    ProfileComponent,
    NewEmployeeComponent,
    DropdownDirective,
    FooterComponent,
    ConfimationComponent,
    NotauthorizedComponent,
    CreateEmployeeComponent,
    NewDepartmentComponent,
    ClickStopPropagationDirective,
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
  providers: [EmployeeService, DepartmentService, LoginActivate, IsLoggedIn  ,TranslateService, HttpClient, AdminManager],
  bootstrap: [AppComponent]
  // ,exports:[AppRoutingModule]
})
export class AppModule { }
