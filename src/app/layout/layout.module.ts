import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule, MatToolbarModule,
    MatDividerModule, MatListModule, MatMenuModule, MatDialogModule, MatTabsModule,
    MatSnackBarModule, MatProgressBarModule, MatProgressSpinnerModule
} from '@angular/material'
import { LoginComponent } from './pages/login/login.component'
import { SharedService } from './shared.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { UserSessionDataResolver, AuthGuard } from './shared.service'


@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        LayoutRoutingModule,
        HttpClientModule,
        MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule, MatMenuModule, MatIconModule,
        MatToolbarModule, MatDividerModule, MatListModule, MatDialogModule, MatTabsModule,
        MatSnackBarModule, MatProgressBarModule, MatProgressSpinnerModule
    ],
    declarations: [
        LayoutComponent, LoginComponent
    ],
    entryComponents: [LoginComponent],
    providers: [SharedService, MediaMatcher, UserSessionDataResolver, AuthGuard]
})
export class LayoutModule { }
