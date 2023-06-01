import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
    messages1!: Message[];

    messages2!: Message[];

    constructor(private router: Router) {}
    ngOnInit() {
        this.messages1 = [
            {
                severity: 'success',
                detail: 'Personal Details',
            },
            {
                severity: 'success',
                detail: 'Institute Details',
            },
        ];

        this.messages2 = [
            {
                severity: 'warn',
                detail: 'Bank Details',
            },
            {
                severity: 'warn',
                detail: 'Kyc Details',
            },
        ];
    }

    route() {
        this.router.navigate(['admin-dashboard']);
    }
}
