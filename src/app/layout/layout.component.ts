import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Menu, MENULIST } from './layout.model'
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    providers: []
})
export class LayoutComponent implements OnInit {

    public menuList: Menu[] = MENULIST;
    public activeMenu:string = "Tee Time";

    constructor(public rtr: Router,public domSanitizer: DomSanitizer) {

    }

    ngOnInit() {
    }

    ngOnDestroy(): void {

    }

    public routeTo(routerLink: string) {
        this.rtr.navigateByUrl(routerLink);
    }
}
