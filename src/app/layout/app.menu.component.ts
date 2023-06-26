import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { StateService } from '../services/state.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private stateSvc: StateService,
        private authSvc: AuthService,
        private router: Router
    ) {
        router.canceledNavigationResolution = 'computed';
    }

    ngOnInit() {
        if (
            this.stateSvc.getUserData('accessToken') &&
            this.stateSvc.getUserData('refreshToken') &&
            this.stateSvc.getUserData('newUser')
        ) {
            this.model = [
                {
                    label: 'Home',
                    items: [
                        {
                            label: 'Dashboard',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/main/admin-dashboard'],
                        },
                    ],
                },
                {
                    // label: 'Admission Form',
                    items: [
                        {
                            label: 'Admission Form ',
                            icon: 'pi pi-fw pi-id-card',
                            routerLink: ['/main/admission'],
                        },
                    ],
                },

                {
                    items: [
                        {
                            label: 'Manage Institutes ',
                            icon: 'fa-solid fa-school',

                            items: [
                                {
                                    label: 'Institute list',
                                    icon: 'fa-solid fa-school',
                                    routerLink: ['/main/institute/list'],
                                },
                                {
                                    label: 'Bank',
                                    icon: 'fa fa-money-bill-transfer',
                                    routerLink: ['/main/institute/bank'],
                                },
                                {
                                    label: 'Staff',
                                    icon: 'fa-solid fa-users',
                                    routerLink: ['/main/institute/staff'],
                                },
                                {
                                    label: 'KYC',
                                    icon: 'fa-solid fa-file-contract',
                                    routerLink: ['/main/institute/kyc'],
                                },
                                {
                                    label: 'Add Institute',
                                    icon: 'fa fa-money-bill-transfer',
                                    routerLink: ['/main/institute/add'],
                                },
                            ],
                        },
                    ],
                },

                {
                    label: 'Student',
                    items: [
                        {
                            label: 'Students ',
                            icon: 'fa-solid fa-graduation-cap',
                            routerLink: ['/main/student'],
                        },
                    ],
                },
                {
                    label: 'Collections',
                    items: [
                        // {
                        //     label: 'Charges ',
                        //     icon: 'pi pi-fw pi-id-card',
                        //     routerLink: ['/main/student'],
                        // },
                        // {
                        //     label: 'Charge group ',
                        //     icon: 'pi pi-fw pi-id-card',
                        //     routerLink: ['/student'],
                        // },
                        {
                            label: 'Collections ',
                            icon: 'pi pi-fw pi-id-card',
                            routerLink: ['/main/collection/list'],
                        },
                    ],
                },
                {
                    label: 'Reports',
                    items: [
                        {
                            label: 'Student report ',
                            icon: 'pi pi-fw pi-id-card',
                            routerLink: ['/student'],
                        },
                        {
                            label: 'Payment Summary ',
                            icon: 'pi pi-fw pi-id-card',
                            routerLink: ['/student'],
                        },
                    ],
                },
            ];
        } else {
            localStorage.clear();

            this.router.navigate(['/auth/login']);
        }
    }
}
