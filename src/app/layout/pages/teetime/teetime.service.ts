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

    public getSlotData(selectedDate: string, tboxId: string): Observable<any> {
        return this.httpClient.get<any>(environment.hostName +
            "resource-date-slots/f03e40a0-6889-11e8-881b-9d116b3528b1/date/2018-06-06",
            { headers: this.sharedServ.getRequestHeaders() });
    }


    public bookTeeSlot(bookTeeSlotData: BookTeeSlot): Observable<any> {
        return this.httpClient.post<any>(environment.hostName + "events", bookTeeSlotData,
            { headers: this.sharedServ.getRequestHeaders() });
    }
}
