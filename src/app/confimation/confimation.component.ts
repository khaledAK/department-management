import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-confimation',
  templateUrl: './confimation.component.html',
  styleUrls: ['./confimation.component.css']
})
export class ConfimationComponent implements OnInit {
  public visible = false;
  public visibleAnimate = false;
  public parent;
  public confirmFunction;
  @Input() message:string="";

  ngOnInit() {
  }

  confirm() {
    this.confirmFunction();
  }

  public show(confirmFunction): void {
    this.confirmFunction = confirmFunction;
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
