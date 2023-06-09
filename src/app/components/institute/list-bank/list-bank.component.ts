import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { BankService } from '../../../services/bank.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-list-bank',
    templateUrl: './list-bank.component.html',
    styleUrls: ['./list-bank.component.scss'],
    providers: [ConfirmationService, DialogService],
})
export class ListBankComponent implements OnInit {
    bank = [];
    items!: MenuItem[];

    constructor(
        private router: Router,
        private stateSvc: StateService,
        private bankSvc: BankService
    ) {}

    ngOnInit(): void {
        this.bankSvc
            .getBanksBySchoolId('d04d7a281927a05db98f')
            .then((res: any) => {
                console.log(res);
                this.bank = res.data;
            });
    }
    navigateToAddBank() {
        this.router.navigate(['/institute/bank/add']);
    }

    handleClick(accNo: any) {
        console.log(event);

        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-pencil',
                routerLink: ['/institute/bank/add'],
                queryParams: { accNo: accNo },
                queryParamsHandling: 'merge',
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {},
            },
        ];
    }
}
