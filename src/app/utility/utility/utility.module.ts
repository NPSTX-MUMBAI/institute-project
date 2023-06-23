import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';
import { UiModule } from 'src/app/ui/ui.module';

const routes: Routes = [{ path: 'filter', component: FilterComponent }];
@NgModule({
    declarations: [FilterComponent],
    imports: [CommonModule, UiModule, RouterModule.forChild(routes)],

    exports: [FilterComponent],
})
export class UtilityModule {}
