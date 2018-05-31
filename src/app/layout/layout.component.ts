import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
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

    constructor(public rtr: Router, public domSanitizer: DomSanitizer,
        private activatedRoute: ActivatedRoute, private dialog: MatDialog, public sharedServ: SharedService) {
        this.rtr.events.subscribe((event: any) => {
            if (event instanceof NavigationStart) {
                this.isRouteLoading = true;
            }
            else if (event instanceof NavigationEnd) {
                this.isRouteLoading = false;
            }
        });
    }

    ngOnInit() {
        setTimeout(() => {
            // this.rtr.navigate(['/home', 'fees-and-cost'], { relativeTo: this.activatedRoute })
        }, 1000);
    }

    ngOnDestroy(): void {

    }

    public routeTo(routerLinkArray: any[]) {
        this.rtr.navigate(routerLinkArray, { relativeTo: this.activatedRoute });
    }

    public loginFormGroup: FormGroup = new FormGroup({
        loginId: new FormControl('', Validators.minLength(2)),
        loginPassword: new FormControl('', Validators.minLength(2))
    });

    public openLoginDialog() {
        let dialogRef: MatDialogRef<LoginComponent> = this.dialog.open(LoginComponent, {
        })
        dialogRef.afterClosed().subscribe((data: any) => {
            this.sharedServ.isUserLoggedIn = true;
            this.routeTo(['teetime'])
        });
    }
}
