import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment'
import { HttpClient, HttpHeaders, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { SharedService } from './../../shared.service'


@Injectable()
export class TeetimeService {

    public environment: any = environment;

    constructor(private httpClient: HttpClient, private sharedServ: SharedService) {

    }

    public getSlotData(selectedDate: Date, slotId: string): Observable<any> {
        return this.httpClient.get<any>(environment.hostName + "fsad/fasd/afsd", { headers: this.sharedServ.getRequestHeaders() });
    }
}
