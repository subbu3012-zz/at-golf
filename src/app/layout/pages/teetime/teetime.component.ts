import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { TeeSlot, TEESLOTLIST } from './teetime.model'
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

    public teeSlotList: TeeSlot[] = TEESLOTLIST;
    public teeTimeDate: Date = new Date();
    public teeBoxName: String = "TBox 1";
    public currentDate: Date = new Date();

    constructor(private dialog: MatDialog, public sharedServ: SharedService, public teeServ: TeetimeService) {

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
        this.teeServ.getSlotData(new Date(), "1").subscribe();
        
        let dialogRef: MatDialogRef<BookTeeTimeComponent> = this.dialog.open(
            BookTeeTimeComponent, {
                "width": "700px",
                "data": { "slotInfo": this.teeSlotList[_index] }
            })
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
    constructor(
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        public sharedServ: SharedService,
        private dialogRef: MatDialogRef<BookTeeTimeComponent>,
    ) {
        this.slotInfo = dialogData.slotInfo;
        console.log(this.slotInfo)
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {

    }

    public bookTeetimeSlot(slotInfo: TeeSlot) {
        this.sharedServ.openSnackBar("Slot booked succesfully. Have a nice day.", "DISMISS", 5000);
        this.dialogRef.close();
    }
}
