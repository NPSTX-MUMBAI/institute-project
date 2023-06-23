import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuardGuard } from './guards/auth-guard.guard';
import { CollectionModule } from './components/collection/collection.module';
import { UtilityModule } from './utility/utility/utility.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'main/admin-dashboard',
        pathMatch: 'full',
    },

    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
    },
    //

    {
        path: 'main',
        component: AppLayoutComponent,
        canActivate: [AuthGuardGuard],

        children: [
            {
                path: 'admin-dashboard',
                loadChildren: () =>
                    import('./components/dashboard/dashboard.module').then(
                        (m) => m.DashboardModule
                    ),
                // canDeactivate: [AuthGuardGuard],
            },
            {
                path: 'admission',

                loadChildren: () =>
                    import('./components/admission/admission.module').then(
                        (m) => m.AdmissionModule
                    ),
            },
            {
                path: 'institute',

                loadChildren: () =>
                    import('./components/institute/institute.module').then(
                        (m) => m.InstituteModule
                    ),
            },
            {
                path: 'student',

                loadChildren: () =>
                    import('./components/student/student.module').then(
                        (m) => m.StudentModule
                    ),
            },

            {
                path: 'collection',

                loadChildren: () =>
                    import('./components/collection/collection.module').then(
                        (m) => m.CollectionModule
                    ),
            },
            {
                path: 'utility',

                loadChildren: () =>
                    import('./utility/utility/utility.module').then(
                        (m) => m.UtilityModule
                    ),
            },
        ],
    },

    //
];

// const routes: Routes = [
//     { path: "", redirectTo: "auth", pathMatch: "full" },
//     {
//       path: "auth",
//       loadChildren: () => import("./auth/auth.module").then((r) => r.AuthModule),
//     },

//     {
//       path: "main",
//       component: LayoutComponent,
//       // canActivate: [AuthguardGuard],
//       children: [
//         {
//           path: "student",
//           loadChildren: () =>
//             import("./students/students.module").then((s) => s.StudentsModule),
//         },
//         {
//           path: "institute",
//           loadChildren: () =>
//             import("./institute/institute.module").then((s) => s.InstituteModule),
//         },
//         {
//           path: "collection",
//           loadChildren: () =>
//             import("./collection/collection.module").then(
//               (s) => s.CollectionModule
//             ),
//         },
//         {
//           path: "dashboard",
//           loadChildren: () =>
//             import("./dashboard/dashboard.module").then((s) => s.DashboardModule),
//         },
//         {
//           path: "reporting",
//           loadChildren: () =>
//             import("./reporting/reporting.module").then((s) => s.ReportingModule),
//         },

//         {
//           path: "payment",
//           loadChildren: () =>
//             import("./payment/payment.module").then((p) => p.PaymentModule),
//         },
//         {
//           path: "auth",
//           loadChildren: () =>
//             import("./auth/auth.module").then((p) => p.AuthModule),
//         },
//         {
//           path: "**",
//           component: PagenotfoundComponent,
//         },
//       ],
//     },
//   ];
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
