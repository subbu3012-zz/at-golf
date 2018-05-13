import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: []
})
export class HomeComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }

    ngOnDestroy(): void {

    }
}
