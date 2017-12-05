import { Directive, Input, HostBinding, HostListener, ChangeDetectorRef} from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {

    @HostBinding("class.open") open: boolean = false;


    constructor(private cdRef:ChangeDetectorRef) {}


    @HostListener('click') openMenu() {
        this.open = !this.open;
    }

    
}