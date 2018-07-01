import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import {
    MatInputModule, MatButtonModule, MatTabsModule, MatCardModule,
    MatExpansionModule, MatIconModule
} from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ForgotPasswordRoutingModule,
        FormsModule, ReactiveFormsModule,
        MatInputModule, MatButtonModule, MatTabsModule, MatCardModule,
        MatExpansionModule, MatIconModule
    ],
    declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
