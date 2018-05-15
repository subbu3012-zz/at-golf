import { Component, ElementRef, NgZone, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MediaMatcher]
})
export class LoginComponent implements OnInit {

    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;


    public loginFormGroup: FormGroup = new FormGroup({
        loginId: new FormControl('', Validators.minLength(2)),
        loginPassword: new FormControl('', Validators.minLength(2))
    });

    public registrationFormGroup: FormGroup = new FormGroup({
        userName: new FormControl('', Validators.minLength(2)),
        emailId: new FormControl('', Validators.minLength(2)),
        password: new FormControl('', Validators.minLength(2)),
        confirmPassword: new FormControl('', Validators.minLength(2))
    });

    constructor(public rtr: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    public logInToApp() {
        console.log(this.loginFormGroup.getRawValue());
        this.rtr.navigate(['layout'])
    }

    public registerUser() {
        console.log(this.registrationFormGroup.getRawValue())
    }
}
