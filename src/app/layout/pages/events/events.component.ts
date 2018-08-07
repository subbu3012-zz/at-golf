import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { EventsService } from './events.service'
import { Event } from './events.model'
import { SharedService } from '../../../layout/shared.service'
import { Router } from '@angular/router';


@Component({
    selector: 'events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
    providers: []
})
export class EventsComponent implements OnInit {

    public guestList: any[] = [];
    public tBoxList: any[] = [];


    constructor(
        public eventServ: EventsService,
        public sharedServ: SharedService,
        public rtr: Router,
    ) {

    }

    ngOnInit() {
        setTimeout(() => {
            this.sharedServ.showProgressBar = true;
        }, 100);
        this.getGuestData();
        this.getTBoxData();
        this.sharedServ.getCustomerData().subscribe(data => {
            this.sharedServ.memberList = data;
        })
        this.sharedServ.getEventsData();
        
    }

    public getMemberInfo(memberId: string) {
        return this.sharedServ.memberList.find(element => element.memberId == memberId);
    }

    public getGuestData() {
        return this.eventServ.getGuestData().subscribe(data => {
            this.guestList = data;
        })
    }

    public getTBoxData(){
        return this.eventServ.getResources().subscribe(data => {
            this.tBoxList = data;
        })
    }

    public getTBoxInfo(tBoxId:string){
        return this.tBoxList.find(data => data.id == tBoxId);
    }

    public getGuestInfo(guestId:string){
        return this.guestList.find(element => element.guestId == guestId);
    }

    ngOnDestroy(): void {

    }
}
