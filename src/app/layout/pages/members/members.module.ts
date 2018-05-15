import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatTabsModule, MatCardModule, MatExpansionModule } from '@angular/material'

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        MembersRoutingModule,
        HttpClientModule,
        MatInputModule, MatButtonModule, MatTabsModule, MatCardModule, MatExpansionModule
    ],
    declarations: [
        MembersComponent,
    ],
    providers: []
})
export class MembersModule { }
