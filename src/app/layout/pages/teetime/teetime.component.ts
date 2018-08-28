import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { TeeSlot, MEMBERLIST, BookTeeSlot, TBOXLIST, TBox, Member } from './teetime.model'
import { MatDialog, MatDialogRef } from '@angular/material';
import { SharedService } from './../../shared.service'
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { TeetimeService } from './teetime.service'
import { MembersRoutingModule } from '../members/members-routing.module';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

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
    public teeTimeBlockDate: Date = new Date();
    public maxDate: Date = new Date();
    public teeBoxList: TBox[] = [];
    public selectedTBox: TBox;

    constructor(
        private dialog: MatDialog,
        public sharedServ: SharedService,
        public teeServ: TeetimeService,
    ) {

    }

    ngOnInit() {
        this.getMasterData();
        this.maxDate.setDate(this.maxDate.getDate() + 2);
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
        this.teeSlotList[_index].resourceId = this.selectedTBox.id;
        let dialogRef: MatDialogRef<BookTeeTimeComponent> = this.dialog.open(
            BookTeeTimeComponent, {
                "width": "1000px",
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

    public blockTeeTimeDate() {
        setTimeout(() => {
            this.sharedServ.showProgressBar = true;
        }, 100);
        this.teeServ.blockTeeTimeDate(this.sharedServ.getTransformedDate(this.teeTimeBlockDate, "yyyy-MM-dd")).subscribe(data => {
            this.sharedServ.openSnackBar("Tee time booking is blocked for the selected date", "DISMISS", 5000);
            this.sharedServ.showProgressBar = false;
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
    public memberList: Member[] = [];
    public bookTeeSlotData: BookTeeSlot = new BookTeeSlot();

    constructor(
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        public sharedServ: SharedService,
        private dialogRef: MatDialogRef<BookTeeTimeComponent>,
        public teeServ: TeetimeService,
        public rtr: Router,
    ) {
        this.slotInfo = dialogData.slotInfo;
    }

    ngOnInit() {
        this.bookTeeSlotData.bookedBy = this.sharedServ.userSessionData['loginId'];
        this.bookTeeSlotData.eventDate = new Date(this.slotInfo.date);
        this.bookTeeSlotData.resourceId = this.slotInfo.resourceId;
        this.bookTeeSlotData.slotId = this.slotInfo.id;
        this.bookTeeSlotData.members = [];
    }

    ngOnDestroy(): void {

    }

    public clearMember(memberType: string, index: number) {
        this.memberList[index] = new Member();
        this.memberList[index].memberType = memberType;
    }

    public addMemberFields(noOfMembers: number) {
        this.memberList = [];
        for (let counter: number = 0; counter < noOfMembers; counter++) {
            this.memberList.push(new Member());
        }
        !this.sharedServ.isUserTypeInsider() && this.setMemberList(0, this.sharedServ.userSessionData['memberId']);
    }

    public setMemberList(index: number, memberId: string) {
        let _selectedMember = this.sharedServ.memberList.filter(element => { return element.memberId == memberId})[0];
        if (_selectedMember) {
            this.memberList[index] = _selectedMember;
            this.memberList[index].memberType = "member";
        } else {
            this.sharedServ.openSnackBar("Member Not Found. Please type in correct member id.", "DISMISS", 5000);
        }
    }

    public getSelectedMemberList(selectedMemberId: string) {
        return this.memberList.filter(member => member.memberId != selectedMemberId).map(data => data.memberId);
    }

    public prepareDataForSlotBooking() {
        let _observableBatch: any[] = [];
        this.memberList.filter(element => element.memberType == "guest").forEach(element => {
            element.memberType = null;
            element.lastName = "";
            _observableBatch.push(this.teeServ.postGuestData(element));
        })
        this.bookTeeSlotData.eventDate = this.sharedServ.getTransformedDate(this.bookTeeSlotData.eventDate, "yyyy-MM-dd");
        this.bookTeeSlotData.members = this.memberList
            .filter(element => element.memberType == "member")
            .map(data => data.memberId);
        if (_observableBatch.length) {
            Observable.forkJoin(_observableBatch).subscribe(data => {
                this.bookTeeSlotData.guests = data.map(data => data.guestId);
                this.bookTeetimeSlot();
            })
        } else {
            this.bookTeetimeSlot();
        }
    }

    public bookTeetimeSlot() {
        this.sharedServ.showProgressBar = true;
        this.teeServ.bookTeeSlot(this.bookTeeSlotData).subscribe(data => {
            this.sharedServ.openSnackBar("Slot booked succesfully. Have a nice day.", "DISMISS", 5000);
            this.dialogRef.close(true);
            this.sharedServ.showProgressBar = false;
            setTimeout(() => {
                this.rtr.navigateByUrl('/layout/events')
            }, 5000);
        }, err => {

        })
    }
}
