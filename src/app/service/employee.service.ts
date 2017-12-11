import { Injectable, EventEmitter } from '@angular/core'
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EmployeeModel } from '../shared/employee.model';



@Injectable()
export class EmployeeService {
    private _currentEmployee: EmployeeModel;
    private _employees: EmployeeModel[] = [];
    currentEmployeeEmitter: EventEmitter<EmployeeModel> = new EventEmitter<EmployeeModel> ();
    employeesEmitter: EventEmitter<EmployeeModel[]> = new EventEmitter<EmployeeModel[]> ();
    private _baseUrl = 'http://localhost:8080/employee/';
    private _loginUrl = 'login';
    private _updateUrl = 'update';
    private _getAllManagerEmployees = 'getallmanageremployees'; 
    private _deleteUrl = 'delete';
    private _addEmployee = "addemployee";
    private _logoutUrl = "logout";
    private _deleteFromDepartment = "deletefromdepartment";
    private _save = "save";

    constructor(private _http: Http){}

    getHeaders():Headers {
        let headers = new Headers();
        headers.append('Authorization' , 'Basic ' +
        btoa(this._currentEmployee.email + ':' + this._currentEmployee.password));
        return headers;
    }

    getCurrentEmployee(): EmployeeModel {
        return Object.assign({}, this._currentEmployee);
    }

    setCurrentEmployee(employee) {
        if(!this._currentEmployee)
            this._currentEmployee = new EmployeeModel();
        this._currentEmployee.toEmployee(Object.assign({}, employee));
        this.currentEmployeeEmitter.emit(this.getCurrentEmployee())
    }

    getEmployees() {
        return this._employees.slice();
    }

    setEmployees(employees) {
        this._employees.splice(0 , this._employees.length);
        employees.employees.map(employee=>{
            this._employees.push(new EmployeeModel().toEmployee(employee))
        });
        this.employeesEmitter.emit(this.getEmployees());
    }

    login(email: string, password:string) {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' +
        btoa(email + ':' + password)); 
        return this._http.get(this._baseUrl +  this._loginUrl , {headers:headers})
             .map((response: Response) => response.json());
    }

    update(employee: EmployeeModel) {
        let headers = this.getHeaders();
    
        return this._http.post(this._baseUrl + this._updateUrl , employee , {headers:headers});
    }


    addEmployee(email , departmentId ) {
        let headers = this.getHeaders();
        return this._http.post(this._baseUrl + this._addEmployee, {email:email , departmentId:departmentId , managerId:this._currentEmployee.id} , {headers:headers});
    }

    getAllEmployees() {
        let headers = this.getHeaders();
        return this._http.post(this._baseUrl + this._getAllManagerEmployees , {id:this._currentEmployee.id} ,
            {headers:headers})
            .map((response:Response) => response.json());
    }

    delete(ids) {
        let headers = this.getHeaders();
        return this._http.post(this._baseUrl + this._deleteUrl , {ids:ids} , {headers:headers});
    }

    deleteFromDepartment(ids) {
        let headers = this.getHeaders();
        return this._http.post(this._baseUrl + this._deleteFromDepartment , {ids:ids} , {headers:headers});
    }

    save(employee) {
        let headers = this.getHeaders();
        return this._http.post(this._baseUrl + this._save , employee , {headers:headers});
    }

    logout() {
        let headers = this.getHeaders();
        return this._http.get(this._baseUrl + this._logoutUrl , {headers:headers});
    }
}