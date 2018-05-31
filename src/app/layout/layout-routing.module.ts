import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'teetime',
                loadChildren: './pages/teetime/teetime.module#TeeTimeModule'
            },
            {
                path: 'home/:category',
                loadChildren: './pages/home/home.module#HomeModule'
            },
            {
                path: 'events',
                loadChildren: './pages/events/events.module#EventsModule'
            },
            {
                path: 'members',
                loadChildren: './pages/members/members.module#MembersModule'
            },
            {
                path: '',
                redirectTo: 'home/landing-page'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
