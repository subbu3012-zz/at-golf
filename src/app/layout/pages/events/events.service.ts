import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment'
import { HttpClient, HttpHeaders, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { SharedService } from './../../shared.service'
import { Event } from './events.model'

@Injectable()
export class EventsService {

    public environment: any = environment;

    constructor(private httpClient: HttpClient, private sharedServ: SharedService) {

    }

    public getEventData(loginId: string): Observable<Event[]> {
        return this.httpClient.get<Event[]>(environment.hostName + "event-members/" + loginId,
            { headers: this.sharedServ.getRequestHeaders() });
    }
}
