import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ChartsDemoModule } from 'src/app/demo/components/uikit/charts/chartsdemo.module';

const routes: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
