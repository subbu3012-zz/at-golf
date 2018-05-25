import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatInputModule, MatButtonModule, MatTabsModule, MatCardModule, MatMenuModule, MatIconModule,
    MatDividerModule
} from '@angular/material'

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        LoginRoutingModule,
        HttpClientModule,
        MatInputModule, MatButtonModule, MatTabsModule, MatCardModule, MatMenuModule, MatIconModule,
        MatDividerModule
    ],
    declarations: [
        LoginComponent,
    ],
    providers: []
})
export class LoginModule { }
