import { Component, OnInit } from '@angular/core';
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
        this.sharedServ.getTournaments(this.sharedServ.userSessionData['memberId']);
    }

    public bookOrWithdrawTournamentForCustomer(tournamentData: any,action:string) {
        setTimeout(() => {
            this.sharedServ.showProgressBar = true;
        }, 100);
        let _memberId = this.sharedServ.userSessionData['memberId'];
        action == 'book' ? 
        tournamentData.members.push(_memberId) : 
        tournamentData.members = tournamentData.members.filter(member => member != _memberId);
        this.updateTournamentData(tournamentData).subscribe(data => {
            this.sharedServ.openSnackBar("Tournament updated succesfully. Have a nice day.", "DISMISS", 5000);
            this.sharedServ.showProgressBar = false;
            this.sharedServ.getTournaments(this.sharedServ.userSessionData['memberId']);
        });
    }

    public isTournamentExpired(tournamentData) {
        return this.sharedServ.isTimeExpired(this.sharedServ.getDateFromString(tournamentData.eventDate), tournamentData.slotStartTime);
    }

    public updateTournamentData(touranmentData: any): Observable<any> {
        return this.httpClient.put<any>(environment.hostName + "events/" + touranmentData.id, touranmentData,
            { headers: this.sharedServ.getRequestHeaders() });
    }
}

@Component({
    selector: 'tournament-view',
    templateUrl: './pages/tournament-view.component.html',
    styles: []
})
export class TournamentViewComponent implements OnInit {
    public tournamentInfo : any;

    constructor(
        private httpClient: HttpClient,
        public sharedServ: SharedService,
        public activatedRoute: ActivatedRoute,
        public rtr: Router,
    ) {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            setTimeout(() => {
                this.sharedServ.showProgressBar = true;
            }, 100);
            this.getTournamentInfo(params.get('id')).subscribe(data => {
                this.tournamentInfo = data;
                this.sharedServ.showProgressBar = false;
            })
        })
    }

    ngOnInit(){
        
    }

    public getDecodedHtml(htmlString:string){
        return htmlString.split('&lt;').join('<').split('&gt;').join('>').split("&amp;").join("&");
    }

    public getTournamentInfo(tournamentId: string): Observable<any> {
        return this.httpClient.get<any>(environment.hostName + "tournaments/" + tournamentId,
            { headers: this.sharedServ.getRequestHeaders() });
    }

}
