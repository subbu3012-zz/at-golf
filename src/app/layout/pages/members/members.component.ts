import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Member, MEMBERLIST, MYMEMBERLIST, MemberGroup, MYGROUPS } from './members.model'

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

    constructor() {

    }

    ngOnInit() {
    }

    ngOnDestroy(): void {

    }
}
