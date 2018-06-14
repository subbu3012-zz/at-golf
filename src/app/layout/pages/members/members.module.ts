import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatInputModule, MatButtonModule, MatTabsModule, MatCardModule,
    MatExpansionModule, MatIconModule
} from '@angular/material'
import { MemberService } from './members.service'
import { SearchArrayPipe } from './../../shared.service'

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        MembersRoutingModule,
        HttpClientModule,
        MatInputModule, MatButtonModule, MatTabsModule, MatCardModule,
        MatExpansionModule, MatIconModule
    ],
    declarations: [
        MembersComponent, SearchArrayPipe
    ],
    providers: [MemberService]
})
export class MembersModule { }
