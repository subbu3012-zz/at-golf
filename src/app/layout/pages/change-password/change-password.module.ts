import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { MatInputModule, MatButtonModule, MatTabsModule, MatCardModule, MatExpansionModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ChangePasswordRoutingModule,
        FormsModule, ReactiveFormsModule,
        MatInputModule, MatButtonModule, MatTabsModule, MatCardModule, MatExpansionModule
    ],
    declarations: [ChangePasswordComponent]
})
export class ChangePasswordModule { }
