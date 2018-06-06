import { Injectable } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { environment } from './../../environments/environment'

@Injectable()
export class SharedService {

    public isUserLoggedIn: boolean = false;
    public mobileQuery: MediaQueryList;
    public userSessionData: Object;
    public showProgressBar: boolean = false;
    public environment: any = environment;

    constructor(media: MediaMatcher, private rtr: Router, public snackBar: MatSnackBar) {
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
            'cid' : 'df926dce-dff3-4b64-a30c-e480934b22d3',
            'Authorization': 'bearer ' + this.userSessionData['token']
        });
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