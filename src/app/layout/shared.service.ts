import { Injectable } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable } from 'rxjs'

@Injectable()
export class SharedService {

    public isUserLoggedIn: boolean = false;
    public mobileQuery: MediaQueryList;
    public userSessionData: Object;

    constructor(media: MediaMatcher, private rtr: Router) {
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
        return sessionStorage.getItem(key);
    }

    public clearSessionData() {
        sessionStorage.clear();
        this.userSessionData = new Object();
        this.isUserLoggedIn = false;
        this.rtr.navigate(['']);
    }

    public getUserSessionDataFromSession() {
        let _userSessionData = new Object();
        for (let _counter = 0; _counter < sessionStorage.length; _counter++) {
            _userSessionData[sessionStorage.key(_counter)] = sessionStorage.getItem(sessionStorage.key(_counter));
        }
        return _userSessionData;
    }
}

import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private sharedServ: SharedService) { }
    canActivate(): boolean {
        if (Object.keys(this.sharedServ.userSessionData).length) {
            if (+this.sharedServ.userSessionData['sessionCreatedTime'] + 300000 < new Date().getTime()) {
                this.sharedServ.clearSessionData();
                return false;
            }
        } else {
            this.sharedServ.clearSessionData();
            return false;
        }
        return true;
    }
}

import {
    Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot
} from '@angular/router';


@Injectable()
export class UserSessionDataResolver implements Resolve<any> {
    constructor(private sharedServ: SharedService, private rtr: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return new Promise((resolve, reject) => {
            console.log(route, state)
            this.sharedServ.userSessionData = this.sharedServ.getUserSessionDataFromSession();
            resolve(true);
        });
    }
}