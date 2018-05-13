import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: './login/login.module#LoginModule'
    },
    {
        path: 'layout',
        loadChildren: './layout/layout.module#LayoutModule'
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
