import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStudentComponent } from './add-student/add-student.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from 'src/app/ui/ui.module';

const routes: Routes = [
    { path: '', component: ListStudentComponent },
    {
        path: 'add',
        component: AddStudentComponent,
    },
];

@NgModule({
    declarations: [AddStudentComponent, ListStudentComponent],
    imports: [CommonModule, UiModule, RouterModule.forChild(routes)],
})
export class StudentModule {}
