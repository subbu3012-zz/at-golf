import { Component, ElementRef, NgZone, OnInit, ViewChild, HostListener } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Menu, MENULIST } from './layout.model'
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenuTrigger } from '@angular/material'
import { LoginComponent } from './pages/login/login.component'
import { MatDialog, MatDialogRef } from '@angular/material';
import { SharedService } from './shared.service'

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    providers: []
})
export class LayoutComponent implements OnInit {

    public menuList: Menu[] = MENULIST;
    public activeMenu: string = "Tee Time";
    public isRouteLoading: boolean = false;
    public isMenuToggled: boolean = !this.sharedServ.mobileQuery.matches;
    public navBarClass:string = "transparent-navbar-class";
    @HostListener("window:scroll", [])
    onWindowScroll() {
        this.setNavBarClass();
    }

    constructor(public rtr: Router, public domSanitizer: DomSanitizer,
        private activatedRoute: ActivatedRoute, private dialog: MatDialog, public sharedServ: SharedService) {
        this.rtr.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                this.isRouteLoading = true;
                this.sharedServ.showProgressBar = true;
            }
            else if (event instanceof NavigationEnd) {
                this.isRouteLoading = false;
                this.sharedServ.showProgressBar = false;
            }
        });
        window.document.title = 'Hyderabad Golf Club - Version ' + this.sharedServ.environment.appVersion;
    }

    ngOnInit() {

    }

    ngOnDestroy(): void {

    }

    public processUserLogout() {
        this.sharedServ.isUserLoggedIn = false;
        this.sharedServ.clearSessionData();
        this.routeTo(['home', 'landing-page'])
    }

    public routeTo(routerLinkArray: any[]) {
        this.rtr.navigate(routerLinkArray, { relativeTo: this.activatedRoute });
        this.sharedServ.mobileQuery.matches && (this.isMenuToggled = false);
    }

    public openLoginDialog() {
        let dialogRef: MatDialogRef<LoginComponent> = this.dialog.open(LoginComponent, {
        })
        // dialogRef.afterClosed().subscribe((data: any) => {
        //     this.sharedServ.isUserLoggedIn = true;
        //     this.routeTo(['teetime'])
        // });
    }

    public setNavBarClass() {
        let _node: any = (document.documentElement || document.body.parentNode || document.body);
        let _scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : _node.scrollTop;
        this.navBarClass = _scrollTop > 100 ? 'colored-navbar-class' : 'transparent-navbar-class';
    }
}
