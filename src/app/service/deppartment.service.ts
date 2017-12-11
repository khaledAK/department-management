import { Injectable, EventEmitter } from '@angular/core'
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { EmployeeService } from './employee.service';
import { DepartmentModel } from '../shared/department.model'

@Injectable()
export class DepartmentService {
    

    private _departments: DepartmentModel[] = [];
    departmentsEmitter: EventEmitter<DepartmentModel[]> = new EventEmitter<DepartmentModel[]>();

    private _baseUrl = 'http://localhost:8080/department/';
    private _getManagerDepartmentsUrl = 'getmanagerdepartments';
    private _getDepartmentByIdUrl = 'getdepartmentbyid';
    private _getAllDepartmentEmployees = 'getalldepartmentemployees';
    private _getAllDepartments = 'getalldepartments';
    private _save = 'save';
    private _deleteDepartments = 'deletedepartments';

    constructor(private _employeeService: EmployeeService, private _http: Http){}

    getDepartments() {
        return this._departments.slice();
    }

    setDepartments(departments) {
        this._departments.splice(0 , this._departments.length);
        departments.map(department => {
            this._departments.push(new DepartmentModel().toDepartment(department));
        });
        this.departmentsEmitter.emit(this.getDepartments());
    }

    getAllDepartmentEmployees(id: number) {
        let headers = this._employeeService.getHeaders();
        let data = {id:id};
        return this._http.post(this._baseUrl + this._getAllDepartmentEmployees , data , {headers: headers})
            .map((response:Response) => response.json());
    }

    getManagerDepartments() {
        let headers = this._employeeService.getHeaders();
        
        let data = {id:this._employeeService.getCurrentEmployee().id};
        return this._http.post(this._baseUrl + this._getManagerDepartmentsUrl , data , {headers: headers})
            .map((response:Response) => response.json());
    }

    getById(id:number) {
        let headers = this._employeeService.getHeaders();
        let data = {id:id};

        return this._http.post(this._baseUrl + this._getDepartmentByIdUrl , data , {headers:headers})
            .map((response:Response) => response.json());
    }

    getAllDepartments() {
        let headers = this._employeeService.getHeaders();
        return this._http.get(this._baseUrl + this._getAllDepartments , {headers:headers})
            .map((response:Response) => response.json());
    }

    save(department) {
        let headers = this._employeeService.getHeaders();
        return this._http.post(this._baseUrl + this._save , department , {headers:headers});
    }

    deleteDepartments(ids) {
        let headers = this._employeeService.getHeaders();
        return this._http.post(this._baseUrl + this._deleteDepartments , {ids:ids} , {headers:headers});
    }
}