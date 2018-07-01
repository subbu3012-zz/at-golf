import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { environment } from './../../../../environments/environment'
import { Observable } from 'rxjs'
import { SharedService } from '../../../layout/shared.service'
import { ActivatedRoute, Router, ParamMap } from '@angular/router'

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styles: []
})
export class ForgotPasswordComponent implements OnInit {

    public changePasswordFormGroup: FormGroup = new FormGroup({
        email: new FormControl('', Validators.minLength(2)),
        verificationCode: new FormControl('', Validators.minLength(2)),
        password0: new FormControl('', Validators.minLength(2)),
        password1: new FormControl('', Validators.minLength(2))
    });

    public showPassword: boolean = false;
    public showConfirmPassword: boolean = false;

    constructor(
        private httpClient: HttpClient,
        public sharedServ: SharedService,
        public activatedRoute: ActivatedRoute,
        public rtr: Router,
    ) {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.changePasswordFormGroup.patchValue({ "email": params.get('emailId') });
        })
    }

    ngOnInit() {
    }

    public updatePassword(changePasswordData: any): Observable<any> {
        return this.httpClient.put<any>(environment.hostName + "customers/updateForgetPassword",changePasswordData);
    }

    public changePassword() {
        this.sharedServ.showProgressBar = true;
        this.updatePassword(this.changePasswordFormGroup.getRawValue()).subscribe(data => {
            this.sharedServ.showProgressBar = false;
            this.sharedServ.openSnackBar("Password changed Succesfully. Try logging in now.", "DISMISS", 5000);
        })
    }
}
