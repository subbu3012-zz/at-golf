import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: []
})
export class LoginComponent implements OnInit {

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



    constructor(public rtr: Router) {

    }

    ngOnInit() {
    }

    ngOnDestroy(): void {

    }

    public logInToApp() {
        console.log(this.loginFormGroup.getRawValue());
        this.rtr.navigate(['layout'])
    }

    public registerUser() {
        console.log(this.registrationFormGroup.getRawValue())
    }
}
