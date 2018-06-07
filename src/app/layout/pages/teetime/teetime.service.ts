import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment'
import { HttpClient, HttpHeaders, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { SharedService } from './../../shared.service'
import { BookTeeSlot } from './teetime.model'

@Injectable()
export class TeetimeService {

    public environment: any = environment;

    constructor(private httpClient: HttpClient, private sharedServ: SharedService) {

    }

    public getSlotData(tboxId: string, selectedDate: string): Observable<any> {
        return this.httpClient.get<any>(environment.hostName +
            "resource-date-slots/" + tboxId + "/date/" + selectedDate,
            { headers: this.sharedServ.getRequestHeaders() });
    }


    public bookTeeSlot(bookTeeSlotData: BookTeeSlot): Observable<any> {
        return this.httpClient.post<any>(environment.hostName + "events", bookTeeSlotData,
            { headers: this.sharedServ.getRequestHeaders() });
    }
}
