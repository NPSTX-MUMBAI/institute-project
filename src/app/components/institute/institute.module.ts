import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddInstituteComponent } from './add-institute/add-institute.component';
import { ListInstituteComponent } from './list-institute/list-institute.component';
import { ListBankComponent } from './list-bank/list-bank.component';
import { AddBankComponent } from './add-bank/add-bank.component';
import { AddKycComponent } from './add-kyc/add-kyc.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { ListStaffComponent } from './list-staff/list-staff.component';
import { UiModule } from '../../ui/ui.module';
import { Routes, RouterModule } from '@angular/router';
import { AdmissionModule } from '../admission/admission.module';
import { AddStdDivComponent } from './add-std-div/add-std-div.component';

const routes: Routes = [
    { path: 'list', component: ListInstituteComponent },
    { path: 'add', component: AddInstituteComponent },
    { path: 'bank', component: ListBankComponent },
    { path: 'bank/add', component: AddBankComponent },
    { path: 'kyc', component: AddKycComponent },
    { path: 'staff/add', component: AddStaffComponent },
    { path: 'staff', component: ListStaffComponent },
    { path: 'addstddiv', component: AddStdDivComponent },

];

@NgModule({
    declarations: [
        AddInstituteComponent,
        ListInstituteComponent,
        ListBankComponent,
        AddBankComponent,
        AddKycComponent,
        AddStaffComponent,
        ListStaffComponent,
        AddStdDivComponent,
    ],
    imports: [
        CommonModule,
        UiModule,
        RouterModule.forChild(routes),
        AdmissionModule,
    ],
})
export class InstituteModule {}
