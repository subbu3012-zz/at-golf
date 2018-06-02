import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styles: []
})
export class AppComponent {
    public loadingTimeout: any;
    constructor(public rtr: Router, public updates: SwUpdate) {
        updates.available.subscribe(event => {
            console.log('current version is', event.current);
            console.log('available version is', event.available);
            if (false) {
                // updates.activateUpdate().then(() => document.location.reload());
            }
        });
        updates.activated.subscribe(event => {
            console.log('old version was', event.previous);
            console.log('new version is', event.current);
        });

        // interval(6 * 60 * 60).subscribe(() => updates.checkForUpdate())
    }
}
