import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent {
    public isRouteLoading: boolean = false;
    public loadingTimeout: any;
    constructor(public rtr: Router) {
        this.rtr.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                this.isRouteLoading = true;
            }
            else if (event instanceof NavigationEnd) {
                this.isRouteLoading = false;
            }
        });
    }
}
