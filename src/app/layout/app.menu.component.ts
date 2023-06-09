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
                            routerLink: ['/admin-dashboard'],
                        },
                    ],
                },
                {
                    label: 'Admission Form',
                    items: [
                        {
                            label: 'Admission Form ',
                            icon: 'pi pi-fw pi-id-card',
                            routerLink: ['/admission'],
                        },
                    ],
                },

                {
                    label: 'Institute',

                    items: [
                        {
                            label: 'Institute ',
                            icon: 'fa-solid fa-school',

                            items: [
                                {
                                    label: 'Institute list',
                                    icon: 'fa-solid fa-school',
                                    routerLink: ['/institute/list'],
                                },
                                {
                                    label: 'Bank',
                                    icon: 'fa fa-money-bill-transfer',
                                    routerLink: ['/institute/bank'],
                                },
                                {
                                    label: 'Staff',
                                    icon: 'fa-solid fa-users',
                                    routerLink: ['/institute/staff'],
                                },
                                {
                                    label: 'KYC',
                                    icon: 'fa-solid fa-file-contract',
                                    routerLink: ['/institute/kyc'],
                                },
                                {
                                    label: 'Add Institute',
                                    icon: 'fa fa-money-bill-transfer',
                                    routerLink: ['/institute/add'],
                                },
                            ],
                        },

                        // label: 'student',
                        // items: [
                        //     {
                        //         label: 'Students ',
                        //         icon: 'pi pi-fw pi-id-card',
                        //         routerLink: ['/student'],
                    ],
                },

                {
                    label: 'student',
                    items: [
                        {
                            label: 'Students ',
                            icon: 'fa-solid fa-graduation-cap',
                            routerLink: ['/student'],
                        },
                    ],
                },
                {
                    label: 'Collections',
                    items: [
                        {
                            label: 'Charges ',
                            icon: 'pi pi-fw pi-id-card',
                            routerLink: ['/student'],
                        },
                        {
                            label: 'Charge group ',
                            icon: 'pi pi-fw pi-id-card',
                            routerLink: ['/student'],
                        },
                        {
                            label: 'Collections ',
                            icon: 'pi pi-fw pi-id-card',
                            routerLink: ['/student'],
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
