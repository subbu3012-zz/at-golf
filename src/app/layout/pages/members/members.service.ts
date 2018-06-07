import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environment'
import { HttpClient, HttpHeaders, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { SharedService } from './../../shared.service'

@Injectable()
export class MemberService {

    public environment: any = environment;

    constructor(private httpClient: HttpClient, private sharedServ: SharedService) {

    }

    public createCustomer(customerData: any): Observable<any> {
        return this.httpClient.post<any>(environment.hostName + "customers", customerData,
            { headers: this.sharedServ.getRequestHeaders() });
    }
}
