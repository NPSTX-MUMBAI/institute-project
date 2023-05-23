import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,

                    loadChildren: () =>
                        import('./components/dashboard/dashboard.module').then(
                            (m) => m.DashboardModule
                        ),
                },
                {
                    component: AppLayoutComponent,
                    path: 'admission',

                    loadChildren: () =>
                        import('./components/admission/admission.module').then(
                            (m) => m.AdmissionModule
                        ),
                },
                {
                    component: AppLayoutComponent,
                    path: 'student',

                    loadChildren: () =>
                        import('./components/student/student.module').then(
                            (m) => m.StudentModule
                        ),
                },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
