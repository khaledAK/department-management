import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../service/employee.service';

@Component({
  selector: 'app-confimation',
  templateUrl: './confimation.component.html',
  styleUrls: ['./confimation.component.css']
})
export class ConfimationComponent implements OnInit {


  public visible = false;
  public visibleAnimate = false;
  public parent;
  constructor(public _employeeService:EmployeeService) { }

  ngOnInit() {
  }

  public deleteFromDepartment(): void {
    this.parent.deleteEmployees();
    this.hide();
  }
  public deleteForever(): void {
    this.parent.deleteForever();
    this.hide();
  }

  public show(parent): void {
    this.parent = parent;
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
}
