import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { ParamMap } from '@angular/router';
import { MGMTCOMMITTEEDATA } from './home.model';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: []
})
export class HomeComponent implements OnInit {
    public contentCategory: string = "home";
    public membercommitteeData: any[] = MGMTCOMMITTEEDATA;

    constructor(public activatedRoute: ActivatedRoute, public rtr: Router) {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.contentCategory = params.get('category');
        })
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {

    }
}
