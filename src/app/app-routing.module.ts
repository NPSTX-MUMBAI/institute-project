import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
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
        canActivate: [AuthGuardGuard],
        // canDeactivate: [AuthGuardGuard],
    },

    {
        component: AppLayoutComponent,
        path: 'admission',

        loadChildren: () =>
            import('./components/admission/admission.module').then(
                (m) => m.AdmissionModule
            ),
        canActivate: [AuthGuardGuard],
    },
    {
        component: AppLayoutComponent,
        path: 'institute',

        loadChildren: () =>
            import('./components/institute/institute.module').then(
                (m) => m.InstituteModule
            ),
        canActivate: [AuthGuardGuard],
    },

    {
        component: AppLayoutComponent,
        path: 'student',

        loadChildren: () =>
            import('./components/student/student.module').then(
                (m) => m.StudentModule
            ),
        canActivate: [AuthGuardGuard],
    },
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            onSameUrlNavigation: 'reload',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
