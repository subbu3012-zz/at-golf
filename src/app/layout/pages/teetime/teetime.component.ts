import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { TeeSlot, TEESLOTLIST } from './teetime.model'

@Component({
    selector: 'teetime',
    templateUrl: './teetime.component.html',
    styleUrls: ['./teetime.component.scss'],
    providers: []
})
export class TeeTimeComponent implements OnInit {

    public teeSlotList: TeeSlot[] = TEESLOTLIST;
    public teeTimeDate: Date = new Date();
    public teeBoxName: String = "TBox 1";
    public currentDate: Date = new Date();

    constructor() {

    }

    ngOnInit() {
    }

    ngOnDestroy(): void {

    }
}
