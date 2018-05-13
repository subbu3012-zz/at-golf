import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeeTimeComponent } from './teetime.component';

const routes: Routes = [
    {
        path: '',
        component: TeeTimeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeeTimeRoutingModule { }
