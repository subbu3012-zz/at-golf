import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { EventsService } from './events.service'
import { Event } from './events.model'
import { SharedService } from '../../../layout/shared.service'


@Component({
    selector: 'events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss'],
    providers: []
})
export class EventsComponent implements OnInit {

    public eventList: Event[] = [];
    public guestList: any[] = [];
    public upcomingEventList: Event[] = [];
    public historyEventList: Event[] = [];
    public tBoxList: any[] = [];


    constructor(
        public eventServ: EventsService,
        public sharedServ: SharedService
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
        this.eventServ.getEventData(this.sharedServ.isUserTypeInsider() ? "events" : "event-members/" + this.sharedServ.userSessionData['memberId']).subscribe(data => {
            this.eventList = data;
            this.eventList.sort((a: Event, b: Event) => {
                if (b.eventDate == a.eventDate) {
                    return this.sharedServ.get24HoursTime(a.slotStartTime).localeCompare(this.sharedServ.get24HoursTime(b.slotStartTime));
                }
                return a.eventDate.localeCompare(b.eventDate);
            })
            this.getEvents();
            this.sharedServ.showProgressBar = false;
        })
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

    public getEvents() {
        this.upcomingEventList = this.eventList.filter(data => !this.sharedServ.isTimeExpired(new Date(data.eventDate), data.slotEndTime))
        this.historyEventList = this.eventList.filter(data => this.sharedServ.isTimeExpired(new Date(data.eventDate), data.slotEndTime))
    }

    ngOnDestroy(): void {

    }
}
