import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Menu, MENULIST } from './layout.model'
import { Router } from '@angular/router';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    providers: []
})
export class LayoutComponent implements OnInit {

    public menuList: Menu[] = MENULIST;

    constructor(public rtr: Router) {

    }

    ngOnInit() {
    }

    ngOnDestroy(): void {

    }

    public routeTo(routerLink: string) {
        this.rtr.navigateByUrl(routerLink);
    }
}
