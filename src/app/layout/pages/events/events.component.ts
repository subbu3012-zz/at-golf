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

    constructor(
        public eventServ: EventsService,
        public sharedServ: SharedService
    ) {

    }

    ngOnInit() {
        setTimeout(() => {
            this.sharedServ.showProgressBar = true;
        }, 100);
        this.eventServ.getEventData(this.sharedServ.isUserTypeInsider() ? "" : this.sharedServ.userSessionData['memberId']).subscribe(data => {
            this.eventList = data;
            this.sharedServ.showProgressBar = false;
            console.log(this.eventList)
        })
    }

    ngOnDestroy(): void {

    }
}
