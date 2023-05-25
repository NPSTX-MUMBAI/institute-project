import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmissionFormComponent } from './admission-form/admission-form.component';
import { Routes, RouterModule } from '@angular/router';
import { UiModule } from '../../ui/ui.module';
import { ParentDetailsComponent } from './admission-form/parent-details/parent-details.component';
import { KycDetailsComponent } from './admission-form/kyc-details/kyc-details.component';
import { StudentDetailsComponent } from './admission-form/student-details/student-details.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: AdmissionFormComponent }];

@NgModule({
    declarations: [
        AdmissionFormComponent,
        StudentDetailsComponent,
        ParentDetailsComponent,
        KycDetailsComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        UiModule,
        ReactiveFormsModule,
    ],
    exports: [KycDetailsComponent],
})
export class AdmissionModule {}
