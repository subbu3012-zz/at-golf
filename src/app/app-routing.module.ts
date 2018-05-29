import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'layout',
        loadChildren: './layout/layout.module#LayoutModule'
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
