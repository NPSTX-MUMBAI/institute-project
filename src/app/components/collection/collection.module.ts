import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UiModule } from '../../ui/ui.module';
import { AddCollectionComponent } from './add-collection/add-collection.component';
import { StudentModule } from '../student/student.module';
const routes: Routes = [{ path: 'add', component: AddCollectionComponent }];

@NgModule({
    declarations: [AddCollectionComponent],
    imports: [
        CommonModule,
        UiModule,
        RouterModule.forChild(routes),
        StudentModule,
    ],
})
export class CollectionModule {}
