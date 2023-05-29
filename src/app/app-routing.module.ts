import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuardService } from './services/auth-guard.service';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    redirectTo: 'admin-dashboard',
                    pathMatch: 'full',
                },

                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./auth/auth.module').then((m) => m.AuthModule),
                },
                {
                    path: 'admin-dashboard',
                    component: AppLayoutComponent,

                    loadChildren: () =>
                        import('./components/dashboard/dashboard.module').then(
                            (m) => m.DashboardModule
                        ),
                    canActivate: [AuthGuardService],
                },

                {
                    component: AppLayoutComponent,
                    path: 'admission',

                    loadChildren: () =>
                        import('./components/admission/admission.module').then(
                            (m) => m.AdmissionModule
                        ),
                    canActivate: [AuthGuardService],
                },
                {
                    component: AppLayoutComponent,
                    path: 'institute',

                    loadChildren: () =>
                        import('./components/institute/institute.module').then(
                            (m) => m.InstituteModule
                        ),
                    canActivate: [AuthGuardService],
                },

                {
                    component: AppLayoutComponent,
                    path: 'student',

                    loadChildren: () =>
                        import('./components/student/student.module').then(
                            (m) => m.StudentModule
                        ),
                    canActivate: [AuthGuardService],
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
