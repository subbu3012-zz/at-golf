import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionsRoutingModule } from './connections-routing.module';
import { ConnectionsComponent } from './connections.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material'

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        ConnectionsRoutingModule,
        HttpClientModule,
        MatInputModule, MatButtonModule
    ],
    declarations: [
        ConnectionsComponent,
    ],
    providers: []
})
export class ConnectionsModule { }
