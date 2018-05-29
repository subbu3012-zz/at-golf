import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatCardModule, MatTabsModule } from '@angular/material'

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        HomeRoutingModule,
        HttpClientModule,
        MatInputModule, MatButtonModule, MatCardModule, MatTabsModule
    ],
    declarations: [
        HomeComponent,
    ],
    providers: []
})
export class HomeModule { }
