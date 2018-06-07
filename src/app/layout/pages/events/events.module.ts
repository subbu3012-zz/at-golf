import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material'
import { EventsService } from './events.service'

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        EventsRoutingModule,
        HttpClientModule,
        MatInputModule, MatButtonModule
    ],
    declarations: [
        EventsComponent,
    ],
    providers: [EventsService]
})
export class EventsModule { }
