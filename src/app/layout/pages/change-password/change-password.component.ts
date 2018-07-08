import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { environment } from './../../../../environments/environment'
import { Observable } from 'rxjs'
import { SharedService } from '../../../layout/shared.service'

export class FileExtensionInfo {
    text: string;
    status: string;
}

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

    public changePasswordFormGroup: FormGroup = new FormGroup({
        oldPassword: new FormControl('', Validators.minLength(2)),
        password: new FormControl('', Validators.minLength(2)),
        confirmPassword: new FormControl('', Validators.minLength(2))
    });

    @ViewChild('uploadFile') uploadFile: any;
    public uploadFileState: FileExtensionInfo = new FileExtensionInfo();
    allowedExtensions = /\.(gif|jpg|jpeg|tiff|png)$/i;
    public uploadedProfilePicFile: File;
    public localImageUrl: string;
    public showOldPassword: boolean = false;
    public showPassword: boolean = false;
    public showConfirmPassword: boolean = false;
    public isDPHovered: boolean = false;

    constructor(
        private httpClient: HttpClient,
        public sharedServ: SharedService
    ) { }

    ngOnInit() {
    }

    public updatePassword(changePasswordData: any): Observable<any> {
        return this.httpClient.put<any>(environment.hostName + "customers/" + this.sharedServ.userSessionData['loginId'] + "/updatePassword", changePasswordData);
    }


    public fileChangeEvent(fileInput: any, pastedInput: File) { // fileInput: Manually Upload File, pastedInput: Paste File
        if (fileInput) {
            this.uploadedProfilePicFile = fileInput.target.files[0];
        } else if (pastedInput) {
            this.uploadedProfilePicFile = pastedInput;
        } else {
            return;
        }
        var reader = new FileReader();

        reader.onload = (event: any) => {
            this.localImageUrl = event.target.result;
        }

        reader.readAsDataURL(this.uploadedProfilePicFile);


        if (!this.uploadedProfilePicFile) {
            this.resetuploadFile();
            return;
        }
        this.fileValidation();
    }


    public fileValidation() {
        /**Maintain allowed Extensions separately */
        if (!this.allowedExtensions.exec(this.uploadedProfilePicFile.name)) {
            this.resetuploadFile();
            this.uploadFileState.text = "Extension not allowed";
            this.uploadFileState.status = "error";
        }
        else {
            this.uploadFileState.text = this.uploadedProfilePicFile.name;
            this.uploadFileState.status = "default";
        }
    }


    public prepareAttachmentForUpload() {
        if (this.uploadedProfilePicFile && this.allowedExtensions.exec(this.uploadedProfilePicFile.name)) {
            this.uploadAndSend(this.uploadedProfilePicFile); //Other files
        }
    }

    public uploadAndSend(uploadedFile: File) {
        this.sharedServ.showProgressBar = true;
        this.sharedServ.uploadFile(uploadedFile, this.sharedServ.userSessionData['userId']);
        this.sharedServ.onuploadFile().subscribe((status: boolean) => {
            if (status) {
                this.sharedServ.openSnackBar("Information Updated Succesfully", "DISMISS", 5000);
                this.sharedServ.showProgressBar = false;
                this.resetuploadFile();
            }
        })
    }

    public resetuploadFile() {
        this.uploadFile.nativeElement.value = "";
        this.uploadFileState.text = "";
        this.uploadFileState.status = "default";
        this.uploadedProfilePicFile = null;
    }

    public updateInfo() {
        if (this.localImageUrl) {
            this.prepareAttachmentForUpload();
        }

        if (this.changePasswordFormGroup.getRawValue()['confirmPassword']) {
            this.changePassword();
        }
    }

    public changePassword() {
        this.sharedServ.showProgressBar = true;
        this.updatePassword(this.changePasswordFormGroup.getRawValue()).subscribe(data => {
            this.sharedServ.showProgressBar = false;

        })
    }
}
