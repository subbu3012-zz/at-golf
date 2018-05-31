import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule, MatToolbarModule,
    MatDividerModule, MatListModule, MatMenuModule, MatDialogModule, MatTabsModule
} from '@angular/material'
import { LoginComponent } from './pages/login/login.component'
import { SharedService } from './shared.service'

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        LayoutRoutingModule,
        HttpClientModule,
        MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule, MatMenuModule, MatIconModule,
        MatToolbarModule, MatDividerModule, MatListModule, MatDialogModule, MatTabsModule
    ],
    declarations: [
        LayoutComponent, LoginComponent
    ],
    entryComponents: [LoginComponent],
    providers: [SharedService]
})
export class LayoutModule { }
