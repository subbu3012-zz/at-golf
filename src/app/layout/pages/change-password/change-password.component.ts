import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { environment } from './../../../../environments/environment'
import { Observable } from 'rxjs'
import { SharedService } from '../../../layout/shared.service'

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styles: []
})
export class ChangePasswordComponent implements OnInit {

    public changePasswordFormGroup: FormGroup = new FormGroup({
        oldPassword: new FormControl('', Validators.minLength(2)),
        password: new FormControl('', Validators.minLength(2)),
        confirmPassword: new FormControl('', Validators.minLength(2))
    });


    constructor(
        private httpClient: HttpClient,
        public sharedServ: SharedService
    ) { }

    ngOnInit() {
    }

    public updatePassword(changePasswordData: any): Observable<any> {
        return this.httpClient.put<any>(environment.hostName + "customers/" + this.sharedServ.userSessionData['loginId'] + "/updatePassword", changePasswordData);
    }

    public changePassword() {
        this.sharedServ.showProgressBar = true;
        this.updatePassword(this.changePasswordFormGroup.getRawValue()).subscribe(data => {
            this.sharedServ.showProgressBar = false;
            this.sharedServ.openSnackBar("Password Updated Succesfully", "DISMISS", 5000);
        })
    }

}
