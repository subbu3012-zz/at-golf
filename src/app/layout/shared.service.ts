import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

    public isUserLoggedIn: boolean = false;

    constructor() {

    }
}