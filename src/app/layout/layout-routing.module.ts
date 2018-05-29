import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'login',
                loadChildren: './pages/login/login.module#LoginModule'
            },
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
            // {
            //     path: '',
            //     redirectTo: 'teetime'
            // }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
