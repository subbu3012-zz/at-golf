import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule, MatToolbarModule, MatDividerModule, MatListModule } from '@angular/material'

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        LayoutRoutingModule,
        HttpClientModule,
        MatInputModule, MatButtonModule, MatSidenavModule, MatIconModule, 
        MatToolbarModule, MatDividerModule, MatListModule
    ],
    declarations: [
        LayoutComponent,
    ],
    providers: []
})
export class LayoutModule { }
