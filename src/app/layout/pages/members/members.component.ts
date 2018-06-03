import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Member, MEMBERLIST, MYMEMBERLIST, MemberGroup, MYGROUPS } from './members.model'
import { SharedService } from '../../../layout/shared.service'


@Component({
    selector: 'members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
    providers: []
})
export class MembersComponent implements OnInit {

    public memberList: Member[] = MEMBERLIST;
    public myMemberList: Member[] = MYMEMBERLIST;
    public myGroupList: MemberGroup[] = MYGROUPS;


    public newMemberGroup: FormGroup = new FormGroup({
        memberName: new FormControl('', Validators.minLength(2)),
        phoneNo: new FormControl('', Validators.minLength(2)),
        emailId: new FormControl('', Validators.minLength(2)),
        loginId: new FormControl('', Validators.minLength(2)),
        password: new FormControl('', Validators.minLength(2)),
        confirmPassword: new FormControl('', Validators.minLength(2))
    });

    constructor(public sharedServ: SharedService) {

    }

    ngOnInit() {
    }

    ngOnDestroy(): void {

    }
}
