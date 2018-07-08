import { Injectable } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { environment } from './../../environments/environment'
import { Member } from './layout.model'
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@Injectable()
export class SharedService {

    public isUserLoggedIn: boolean = false;
    public mobileQuery: MediaQueryList;
    public userSessionData: Object;
    public showProgressBar: boolean = false;
    public environment: any = environment;
    public memberList: Member[] = [];
    public uploadFileSubject: Subject<boolean> = new Subject<boolean>();

    constructor(
        media: MediaMatcher,
        private rtr: Router,
        public snackBar: MatSnackBar,
        private httpClient: HttpClient,
        public datePipe: DatePipe
    ) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
    }

    public setSessionData(userSessionData: Object) {
        Object.keys(userSessionData).forEach(key => {
            sessionStorage.setItem(key, userSessionData[key]);
            sessionStorage.setItem('sessionCreatedTime', Date.now().toString());
        });
        this.userSessionData = userSessionData;
    }

    public getSessionValue(key: string) {
        return sessionStorage.getItem(key) || '';
    }

    public clearSessionData() {
        sessionStorage.clear();
        this.userSessionData = new Object();
    }

    public forceLogoutUser() {
        this.clearSessionData();
        this.isUserLoggedIn = false;
        this.rtr.navigate(['']);
        this.openSnackBar("Your login is expired. Kindy login again.", "DISMISS", 5000)
    }

    public getUserSessionDataFromSession() {
        let _userSessionData = new Object();
        for (let _counter = 0; _counter < sessionStorage.length; _counter++) {
            _userSessionData[sessionStorage.key(_counter)] = sessionStorage.getItem(sessionStorage.key(_counter));
        }
        return _userSessionData;
    }

    public openSnackBar(message: string, action: string, duration: number = 5000) {
        return this.snackBar.open(message, action, { duration: duration });
    }

    public isUserTypeInsider() {
        return this.getSessionValue('userType').toLowerCase() == 'insider';
    }

    public authorizeUser() {
        this.userSessionData = this.getUserSessionDataFromSession();
        if (Object.keys(this.userSessionData).length) {
            if (+this.userSessionData['sessionCreatedTime'] + environment.forceLogoutTimeInterval < new Date().getTime()) {
                this.isUserLoggedIn = false;
            } else {
                this.isUserLoggedIn = true;
            }
        } else {
            this.isUserLoggedIn = false;
        }
    }

    public getRequestHeaders() {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'cid': 'df926dce-dff3-4b64-a30c-e480934b22d3',
            'Authorization': 'bearer ' + this.userSessionData['token']
        });
    }

    public getCustomerData(): Observable<Member[]> {
        return this.httpClient.get<Member[]>(environment.hostName + "customers",
            { headers: this.getRequestHeaders() });
    }

    public getTransformedDate(date: Date, dateFormat: string) {
        return this.datePipe.transform(date, dateFormat);
    }

    public uploadFile(uploadedFile: File, customerId: string) {
        let self = this;
        let formData = new FormData();
        var xhr = new XMLHttpRequest();
        /**Prepare form data */
        formData.append("image", uploadedFile, uploadedFile.name);

        /*********************/
        xhr.open('POST', environment.hostName + "userprofileimage/" + customerId);
        xhr.setRequestHeader("cid", "df926dce-dff3-4b64-a30c-e480934b22d3");
        xhr.setRequestHeader("Authorization", 'bearer ' + this.userSessionData['token']);
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 201) {
                    self.uploadFileSubject.next(true); // On Upload Success
                    self.uploadFileSubject = new Subject<boolean>();
                }
                else {
                    console.log('here')
                    self.uploadFileSubject.next(false); // On Upload Failure
                }
            }
        }
        xhr.send(formData);
    }

    /**Send upload status back to the component*/
    public onuploadFile(): Observable<boolean> {
        return this.uploadFileSubject.asObservable();
    }
}

import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private sharedServ: SharedService) { }
    canActivate(): boolean {
        this.sharedServ.authorizeUser();
        if (this.sharedServ.isUserLoggedIn) {
            return true;
        } else {
            this.sharedServ.forceLogoutUser();
            return false;
        }
    }
}

import {
    Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot
} from '@angular/router';
import { HttpHeaders } from '@angular/common/http';


@Injectable()
export class UserSessionDataResolver implements Resolve<any> {
    constructor(private sharedServ: SharedService, private rtr: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.sharedServ.authorizeUser();
            resolve(true);
        });
    }
}

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'searchArray' })
export class SearchArrayPipe implements PipeTransform {
    transform(searchArray: any[], searchFields: string, searchKeyword: string): any[] {
        if (!searchKeyword) return searchArray;
        return searchArray.filter(element => { return this.isValidElement(element, searchFields.split(","), searchKeyword) });
    }

    isValidElement(searchElement: any, searchFields: string[], searchKeyword: string): boolean {
        let _isValid = false;
        searchFields.forEach(keyField => {
            if (searchElement[keyField] && searchElement[keyField].toLowerCase().includes(searchKeyword.toLowerCase())) {
                _isValid = true; return;
            }
        });
        return _isValid;
    }
}