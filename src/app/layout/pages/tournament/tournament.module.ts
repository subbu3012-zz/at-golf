import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentComponent,TournamentViewComponent } from './tournament.component';
import { TournamentRoutingModule } from './tournament-routing.module';
import {
    MatInputModule, MatButtonModule, MatTabsModule, MatCardModule,
    MatExpansionModule, MatIconModule
} from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TournamentRoutingModule,
        FormsModule, ReactiveFormsModule,
        MatInputModule, MatButtonModule, MatTabsModule, MatCardModule,
        MatExpansionModule, MatIconModule
    ],
    declarations: [TournamentComponent,TournamentViewComponent]
})
export class TournamentModule { }
