import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';
import { InstituteService } from '../services/institute.service';
import { Institute } from '../models/institute.model';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;
    institute!: Institute[];

    selectedInstitute!: Institute;

    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private stateSvc: StateService,
        private instSvc: InstituteService
    ) {
        this.institute = [
            { instituteName: 'MGM College' },
            { instituteName: 'Don Bosco' },
        ];

        this.items = [
            {
                label: 'Logout',
                icon: 'pi pi-fw pi-trash',
                command: () => {
                    this.logOut();
                },
            },
        ];
    }

    ngOnInit(): void {
        let myUser: any = this.stateSvc.getUserData('userId');
        let temp: any;
        console.log(myUser);
        this.instSvc.getInstitutesForUser(myUser).then((res: any) => {
            temp = res.data[0];
            this.institute.push({instituteName:temp.instituteName});
            console.log(this.institute);
        });
    }

    logOut() {
        localStorage.clear();

        window.location.reload();
    }
}
