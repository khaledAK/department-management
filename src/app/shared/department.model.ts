export class DepartmentModel {
    id: number;
    name: string;
    managerId: number;
    
    toDepartment(department) {
        this.id = department.id;
        this.name = department.name;
        this.managerId = department.managerId;
        return this;
    }
}