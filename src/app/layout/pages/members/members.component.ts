import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Member, MemberGroup } from './members.model'
import { SharedService } from '../../../layout/shared.service'
import { MemberService } from './members.service'

@Component({
    selector: 'members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
    providers: []
})
export class MembersComponent implements OnInit {

    // public memberList: Member[] = [];
    // public myMemberList: Member[] = [];
    // public myGroupList: MemberGroup[] = [];

    public newMemberGroup: FormGroup = new FormGroup({
        firstName: new FormControl('', Validators.minLength(2)),
        lastName: new FormControl('', Validators.minLength(2)),
        phone: new FormControl('', Validators.minLength(2)),
        email: new FormControl('', Validators.minLength(2)),
        password: new FormControl('', Validators.minLength(2)),
        confirmPassword: new FormControl('', Validators.minLength(2))
    });

    constructor(
        public sharedServ: SharedService,
        public memServ: MemberService
    ) {

    }

    ngOnInit() {
        this.getMemberList();
    }

    public getMemberList() {
        setTimeout(() => {
            this.sharedServ.showProgressBar = true;
        }, 100);
        this.sharedServ.getCustomerData().subscribe(data => {
            this.sharedServ.memberList = data;
            this.sharedServ.showProgressBar = false;
        })
    }

    ngOnDestroy(): void {

    }

    registerMember() {
        this.sharedServ.showProgressBar = true;
        this.memServ.createCustomer(this.newMemberGroup.getRawValue()).subscribe(data => {
            this.getMemberList();
            this.sharedServ.openSnackBar("Member is added succesfully.", "DISMISS", 5000);
            this.sharedServ.showProgressBar = false;
        })
    }
}
