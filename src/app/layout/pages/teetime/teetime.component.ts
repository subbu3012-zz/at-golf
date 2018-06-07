import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { TeeSlot, MEMBERLIST, BookTeeSlot, TBOXLIST, TBox } from './teetime.model'
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
    public teeBoxList: TBox[] = [];
    public selectedTBox: TBox;

    constructor(
        private dialog: MatDialog,
        public sharedServ: SharedService,
        public teeServ: TeetimeService
    ) {

    }

    ngOnInit() {
        this.getMasterData();
    }

    ngOnDestroy(): void {

    }

    public getMasterData() {
        setTimeout(() => {
            this.sharedServ.showProgressBar = true;
        }, 100);
        if (this.teeBoxList.length) {
            this.getTeeSlotData();
        } else {
            this.teeServ.getResources().subscribe(data => {
                this.teeBoxList = data;
                this.selectedTBox = this.teeBoxList[0];
                this.getTeeSlotData();
            })
        }
    }

    public setSlotToFocus(slotIndex: number) {
        this.teeSlotList.forEach((element, index) => {
            element.isFocused = (index == slotIndex);
        })
    }

    public openBookTeetimeModal(_index: number) {
        //temp fix
        this.teeSlotList[_index].resourceId = this.selectedTBox.id;
        let dialogRef: MatDialogRef<BookTeeTimeComponent> = this.dialog.open(
            BookTeeTimeComponent, {
                "width": "700px",
                "data": { "slotInfo": this.teeSlotList[_index] }
            })
        dialogRef.afterClosed().subscribe(data => {
            data && this.getTeeSlotData();
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
        this.bookTeeSlotData.slotId = this.slotInfo.id;
        this.bookTeeSlotData.members = [];
    }

    ngOnDestroy(): void {

    }

    public bookTeetimeSlot() {
        this.sharedServ.showProgressBar = true;
        this.teeServ.bookTeeSlot(this.bookTeeSlotData).subscribe(data => {
            this.sharedServ.openSnackBar("Slot booked succesfully. Have a nice day.", "DISMISS", 5000);
            this.dialogRef.close(true);
            this.sharedServ.showProgressBar = false;
        }, err => {

        })
    }
}
