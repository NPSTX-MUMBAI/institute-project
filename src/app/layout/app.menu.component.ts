import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                    },
                ],
            },
            {
                label: 'Institute',
                items: [
                    {
                        label: 'Admission Form ',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/admission'],
                    },
                ],
            },
            {
                items: [
                    {
                        label: 'Institute ',
                        icon: 'pi pi-fw pi-id-card',

                        items: [
                            {
                                label: 'Institute list',
                                icon: 'fa fa-money-bill-transfer',
                                routerLink: ['/institute'],
                            },
                            {
                                label: 'Bank',
                                icon: 'fa fa-money-bill-transfer',
                                routerLink: ['/institute/bank'],
                            },
                            {
                                label: 'Staff',
                                icon: 'fa fa-money-bills',
                                routerLink: ['/institute/staff'],
                            },
                            {
                                label: 'KYC',
                                icon: 'fa fa-book',
                                routerLink: ['/institute/kyc'],
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
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/student'],
                    },
                ],
            },
        ];
    }
}
