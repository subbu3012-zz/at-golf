import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
    providers: []
})
export class EventsComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }

    ngOnDestroy(): void {

    }
}
