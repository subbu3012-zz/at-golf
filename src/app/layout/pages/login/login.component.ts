import { Component, ElementRef, NgZone, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material'
import { environment } from './../../../../environments/environment'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { SharedService } from '../../../layout/shared.service'

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    private _mobileQueryListener: () => void;
    private loginExceptionDesc: string = "";

    public loginFormGroup: FormGroup = new FormGroup({
        loginId: new FormControl('', [Validators.minLength(2), Validators.required]),
        loginPassword: new FormControl('', [Validators.minLength(2), Validators.required])
    });

    constructor(
        public rtr: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private activatedRoute: ActivatedRoute,
        private dialogRef: MatDialogRef<LoginComponent>,
        private httpClient: HttpClient,
        private sharedServ: SharedService
    ) {
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.sharedServ.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.sharedServ.mobileQuery.removeListener(this._mobileQueryListener);
    }

    public logUserInToApp() {
        this.sharedServ.isUserLoggedIn = true;
        this.rtr.navigateByUrl('/layout/home/landing-page');
    }

    public registerUser() {
        // console.log(this.registrationFormGroup.getRawValue())
    }

    public processUserLogin() {
        this.markFormGroupTouched(this.loginFormGroup);
        if (this.loginFormGroup.valid) {
            let _loginPayload = {};
            let _loginId = this.loginFormGroup.controls['loginId'].value;
            _loginPayload['password'] = this.loginFormGroup.controls['loginPassword'].value;
            _loginPayload[(_loginId.includes("@admin.com") ? 'email' : 'memberId')] = _loginId;
            this.sharedServ.showProgressBar = true;
            this.loginUser(_loginPayload).subscribe(data => {
                if (data) {
                    data['loginId'] = _loginId;
                    this.sharedServ.setSessionData(data);
                    this.dialogRef.close();
                    this.dialogRef.afterClosed().subscribe(data => {
                        this.logUserInToApp();
                    })
                    this.sharedServ.showProgressBar = false;
                } else {
                    this.loginExceptionDesc = "Invalid credentials. Try again or contact your admin."
                    this.sharedServ.showProgressBar = false;
                }
            }, err => {
                this.loginExceptionDesc = "Invalid credentials. Try again or contact your admin."
                this.sharedServ.showProgressBar = false;
            })
        }
    }

    private markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control.controls) {
                control.controls.forEach(c => this.markFormGroupTouched(c));
            }
        });
    }

    public loginUser(loginPayload: any): Observable<any> {
        return this.httpClient.post<any>(environment.hostName + "oauth2/token?cid=df926dce-dff3-4b64-a30c-e480934b22d3", loginPayload);
    }
}
