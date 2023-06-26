import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UiModule } from '../../ui/ui.module';
import { AddCollectionComponent } from './add-collection/add-collection.component';
import { StudentModule } from '../student/student.module';
import { ListCollectionsComponent } from './list-collections/list-collections.component';
import { AddChargeComponent } from './add-charge/add-charge.component';

const routes: Routes = [
    { path: 'add', component: AddCollectionComponent },
    { path: 'list', component: ListCollectionsComponent },
    { path: 'add-charge', component: AddChargeComponent },
];

@NgModule({
    declarations: [
        AddCollectionComponent,
        ListCollectionsComponent,
        AddChargeComponent,
    ],
    imports: [
        CommonModule,
        UiModule,
        RouterModule.forChild(routes),
        StudentModule,
    ],
})
export class CollectionModule {}
