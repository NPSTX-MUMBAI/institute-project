import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmissionFormComponent } from './admission-form/admission-form.component';
import { Routes, RouterModule } from '@angular/router';
import { UiModule } from '../../ui/ui.module';

const routes: Routes = [{ path: '', component: AdmissionFormComponent }];

@NgModule({
    declarations: [AdmissionFormComponent],
    imports: [CommonModule, RouterModule.forChild(routes), UiModule],
})
export class AdmissionModule {}
