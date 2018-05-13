import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeeTimeRoutingModule } from './teetime-routing.module';
import { TeeTimeComponent } from './teetime.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material'

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        TeeTimeRoutingModule,
        HttpClientModule,
        MatInputModule, MatButtonModule
    ],
    declarations: [
        TeeTimeComponent,
    ],
    providers: []
})
export class TeeTimeModule { }
