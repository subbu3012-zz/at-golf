import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { environment } from './../../../../environments/environment'
import { Observable } from 'rxjs'
import { SharedService } from '../../../layout/shared.service'
import { ActivatedRoute, Router, ParamMap } from '@angular/router'

@Component({
    selector: 'tournament',
    templateUrl: './tournament.component.html',
    styles: []
})
export class TournamentComponent implements OnInit {
    public tournamentList: any[] = [];
    constructor(
        private httpClient: HttpClient,
        public sharedServ: SharedService,
        public activatedRoute: ActivatedRoute,
        public rtr: Router,
    ) {

    }

    ngOnInit() {
        setTimeout(() => {
            this.sharedServ.showProgressBar = true;
        }, 100);
        this.getTournaments(this.sharedServ.userSessionData['memberId']);
    }

    public getTournaments(memberId) {
        setTimeout(() => {
            this.sharedServ.showProgressBar = true;
        }, 100);
        this.getTournamentData().subscribe(data => {
            this.tournamentList = data;
            this.tournamentList.forEach(data => {
                data.isBookedForMember = data.members.includes(memberId);
            })
            this.sharedServ.showProgressBar = false;
        })
    }

    public bookTournamentForCustomer(tournamentData: any) {
        setTimeout(() => {
            this.sharedServ.showProgressBar = true;
        }, 100);
        // tournamentData.members = [];
        tournamentData.members.push(this.sharedServ.userSessionData['memberId']);
        this.updateTournamentData(tournamentData).subscribe(data => {
            this.sharedServ.openSnackBar("Tournament booked succesfully. Have a nice day.", "DISMISS", 5000);
            this.sharedServ.showProgressBar = false;
            this.getTournaments(this.sharedServ.userSessionData['memberId']);
        });
    }

    public isTournamentExpired(tournamentData) {
        return this.sharedServ.isTimeExpired(this.sharedServ.getDateFromString(tournamentData.eventDate), tournamentData.slotStartTime);
    }

    public getTournamentData(): Observable<Event[]> {
        return this.httpClient.get<Event[]>(environment.hostName + "event-type/Tournament/category/Tournament",
            { headers: this.sharedServ.getRequestHeaders() });
    }

    public updateTournamentData(touranmentData: any): Observable<any> {
        return this.httpClient.put<any>(environment.hostName + "events/" + touranmentData.id, touranmentData,
            { headers: this.sharedServ.getRequestHeaders() });
    }
}
