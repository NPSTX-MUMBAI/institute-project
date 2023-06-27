import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ChartsDemoModule } from 'src/app/demo/components/uikit/charts/chartsdemo.module';
import { UiModule } from 'src/app/ui/ui.module';
import { PieChartComponent } from './pie-chart/pie-chart.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    {
        path: 'pie',
        component: PieChartComponent,
    },
];

@NgModule({
    declarations: [PieChartComponent, DashboardComponent],
    imports: [CommonModule, UiModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
