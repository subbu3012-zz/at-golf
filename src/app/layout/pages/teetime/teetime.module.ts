import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeeTimeRoutingModule } from './teetime-routing.module';
import { TeeTimeComponent } from './teetime.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatDatepickerModule, MAT_DATE_LOCALE, MatNativeDateModule, MatCardModule } from '@angular/material'

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        TeeTimeRoutingModule,
        HttpClientModule,
        MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule,MatCardModule
    ],
    declarations: [
        TeeTimeComponent,
    ],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-In' }]
})
export class TeeTimeModule { }
