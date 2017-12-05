export class EmployeeModel {
    id: number;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    password:string;
    roleId: number;
    departmentId: number;
    managerId: number;
    role: string;

    toEmployee(employee) {
        this.id = employee.id;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.mobileNumber = employee.mobileNumber;
        this.email = employee.email;
        this.password = employee.password;
        this.roleId = employee.roleId;
        this.departmentId = employee.departmentId;
        this.managerId = employee.managerId;

        if(this.roleId === 1)
            this.role = "ROLE_MANAGER";
        else if(this.roleId == 2)
            this.role = "ROLE_ADMINSTRATOR";
        else
            this.role = "ROLE_EMPLOYEE";
        return this;
    }
}