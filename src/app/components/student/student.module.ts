import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from 'src/app/ui/ui.module';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { UtilityModule } from 'src/app/utility/utility/utility.module';
import { ProgressBarModule } from 'primeng/progressbar';

const routes: Routes = [
    { path: '', component: ListStudentComponent },
    {
        path: 'add-student',
        component: AddStudentComponent,
    },
    {
        path: 'bulkUpload',
        component: BulkUploadComponent,
    },
];

@NgModule({
    declarations: [
        AddStudentComponent,
        ListStudentComponent,
        BulkUploadComponent,
    ],
    imports: [
        CommonModule,
        UiModule,
        UtilityModule,
        RouterModule.forChild(routes),
        ProgressBarModule,
    ],
    exports: [ListStudentComponent],
})
export class StudentModule {}
