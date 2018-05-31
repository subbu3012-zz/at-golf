import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { UserSessionDataResolver, AuthGuard } from './shared.service'

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'teetime',
                loadChildren: './pages/teetime/teetime.module#TeeTimeModule',
                resolve: [UserSessionDataResolver],
                canActivate: [AuthGuard]
            },
            {
                path: 'home/:category',
                loadChildren: './pages/home/home.module#HomeModule',
                resolve: [UserSessionDataResolver]
            },
            {
                path: 'events',
                loadChildren: './pages/events/events.module#EventsModule',
                resolve: [UserSessionDataResolver],
                canActivate: [AuthGuard]
            },
            {
                path: 'members',
                loadChildren: './pages/members/members.module#MembersModule',
                resolve: [UserSessionDataResolver],
                canActivate: [AuthGuard]
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
