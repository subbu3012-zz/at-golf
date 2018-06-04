import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { TeeSlot, TEESLOTLIST } from './teetime.model'
import { MatDialog, MatDialogRef } from '@angular/material';
import { SharedService } from './../../shared.service'

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

    constructor(private dialog: MatDialog, public sharedServ: SharedService) {

    }

    ngOnInit() {
    }

    ngOnDestroy(): void {

    }

    public setSlotToFocus(slotIndex: number) {
        this.teeSlotList.forEach((element, index) => {
            element.isFocused = (index == slotIndex);
        })
    }

    openBookTeetimeModal(_index: number) {
        return;
    }
}

@Component({
    selector: 'book-teetime',
    templateUrl: './teetime.component.html',
    styleUrls: ['./teetime.component.scss'],
    providers: []
})
export class BookTeeTimeComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }

    ngOnDestroy(): void {

    }
}
