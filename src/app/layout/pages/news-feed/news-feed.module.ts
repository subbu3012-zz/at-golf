import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsFeedComponent } from './news-feed.component';
import { NewsFeedRoutingModule } from './news-feed-routing.module';
import {
    MatInputModule, MatButtonModule,
    MatExpansionModule, MatIconModule
} from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        NewsFeedRoutingModule,
        FormsModule, ReactiveFormsModule,
        MatInputModule, MatButtonModule,
        MatExpansionModule, MatIconModule
    ],
    declarations: [NewsFeedComponent]
})
export class NewsFeedModule { }
