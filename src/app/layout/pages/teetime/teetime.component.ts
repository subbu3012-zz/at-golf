import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { TeeSlot, MEMBERLIST, BookTeeSlot, TBOXLIST } from './teetime.model'
import { MatDialog, MatDialogRef } from '@angular/material';
import { SharedService } from './../../shared.service'
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { TeetimeService } from './teetime.service'

@Component({
    selector: 'teetime',
    templateUrl: './teetime.component.html',
    styleUrls: ['./teetime.component.scss'],
    providers: []
})
export class TeeTimeComponent implements OnInit {

    public teeSlotList: TeeSlot[] = [];
    public teeTimeDate: Date = new Date();
    public currentDate: Date = new Date();
    public teeBoxList: any[] = TBOXLIST;
    public selectedTBox: any = this.teeBoxList[0];

    constructor(
        private dialog: MatDialog,
        public sharedServ: SharedService,
        public teeServ: TeetimeService
    ) {

    }

    ngOnInit() {
        this.getTeeSlotData();
    }

    ngOnDestroy(): void {

    }

    public setSlotToFocus(slotIndex: number) {
        this.teeSlotList.forEach((element, index) => {
            element.isFocused = (index == slotIndex);
        })
    }

    public openBookTeetimeModal(_index: number) {
        let dialogRef: MatDialogRef<BookTeeTimeComponent> = this.dialog.open(
            BookTeeTimeComponent, {
                "width": "700px",
                "data": { "slotInfo": this.teeSlotList[_index] }
            })
    }

    public getTeeSlotData() {
        setTimeout(() => {
            this.sharedServ.showProgressBar = true;
        }, 100);
        this.teeServ.getSlotData(this.selectedTBox.resourceId, this.sharedServ.getTransformedDate(this.teeTimeDate, "yyyy-MM-dd")).subscribe(data => {
            !this.sharedServ.memberList.length && this.sharedServ.getCustomerData().subscribe(data1 => {
                this.sharedServ.memberList = data1;
            })
            this.teeSlotList = data;
            this.teeSlotList = this.teeSlotList.sort((a: any, b: any) => {
                return +a.slotId.slice(4) - +b.slotId.slice(4);
            })
            this.sharedServ.showProgressBar = false;
        });
    }
}

@Component({
    selector: 'book-teetime',
    templateUrl: './dialogs/book-teetime.component.html',
    // styleUrls: ['./teetime.component.scss'],
    providers: []
})
export class BookTeeTimeComponent implements OnInit {

    public slotInfo: TeeSlot;
    public memberList: any[] = MEMBERLIST;
    public bookTeeSlotData: BookTeeSlot = new BookTeeSlot();

    constructor(
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        public sharedServ: SharedService,
        private dialogRef: MatDialogRef<BookTeeTimeComponent>,
        public teeServ: TeetimeService
    ) {
        this.slotInfo = dialogData.slotInfo;
    }

    ngOnInit() {
        this.bookTeeSlotData.bookedby = this.sharedServ.userSessionData['loginId'];
        this.bookTeeSlotData.eventDate = new Date(this.slotInfo.date);
        this.bookTeeSlotData.resourceId = this.slotInfo.resourceId;
        this.bookTeeSlotData.slotId = this.slotInfo.slotId;
        this.bookTeeSlotData.members = [];
    }

    ngOnDestroy(): void {

    }

    public bookTeetimeSlot() {
        this.sharedServ.showProgressBar = true;
        this.teeServ.bookTeeSlot(this.bookTeeSlotData).subscribe(data => {
            this.sharedServ.openSnackBar("Slot booked succesfully. Have a nice day.", "DISMISS", 5000);
            this.dialogRef.close();
            this.sharedServ.showProgressBar = false;
        }, err => {

        })
    }
}
