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
        this.sharedServ.showProgressBar = true;
        this.getTournaments().subscribe(data => {
            this.tournamentList = data;
            this.sharedServ.showProgressBar = false;
        });
    }

    public getTournaments(): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.hostName + "tournaments",
            { headers: this.sharedServ.getRequestHeaders() });
    }

    public bookTournamentForCustomer(tournamentData:any){
        this.bookForTournament(tournamentData).subscribe(data => {
            this.sharedServ.openSnackBar("Tournament booked succesfully. Have a nice day.", "DISMISS", 5000);
            this.sharedServ.showProgressBar = false;
            setTimeout(() => {
                this.rtr.navigateByUrl('/layout/events')
            }, 5000);
        })
    }

    public bookForTournament(tournamentData: any) {
        tournamentData.customerId = this.sharedServ.userSessionData['userId'];
        return this.httpClient.post<any>(environment.hostName + "tournaments", tournamentData,
            { headers: this.sharedServ.getRequestHeaders() });
    }
}
