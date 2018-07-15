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

    public getEventData(endPoint:string): Observable<Event[]> {
        return this.httpClient.get<Event[]>(environment.hostName + endPoint,
            { headers: this.sharedServ.getRequestHeaders() });
    }

    public getGuestData():Observable<any[]>{
        return this.httpClient.get<Event[]>(environment.hostName + "guests",
            { headers: this.sharedServ.getRequestHeaders() });
    }

    public getResources(): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.hostName + "resources",
            { headers: this.sharedServ.getRequestHeaders() });
    }
}
