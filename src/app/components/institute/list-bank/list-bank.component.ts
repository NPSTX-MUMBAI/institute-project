import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-bank',
    templateUrl: './list-bank.component.html',
    styleUrls: ['./list-bank.component.scss'],
})
export class ListBankComponent {
    bank: any = [
        {
            AccountName: 'abc',
            AccountType: 'current',
            AccountNo: '7841254125841',
            IFSCCode: 'SBIN0011513',
            BankName: 'SBI',
            BranchName: 'Invalid ',
        },
        {
            AccountName: 'Fan',
            AccountType: 'current',
            AccountNo: '8741254125861',
            IFSCCode: 'HDfN0011545',
            BankName: 'HDFC',
            BranchName: 'Valid ',
        },
        {
            AccountName: 'Team',
            AccountType: 'current',
            AccountNo: '6441254125841',
            IFSCCode: 'SBIN0011513',
            BankName: 'SBI',
            BranchName: 'Valid ',
        },
        {
            AccountName: 'Vishal',
            AccountType: 'current',
            AccountNo: '5641254125841',
            IFSCCode: 'BOIN0011513',
            BankName: 'BOI',
            BranchName: 'Valid ',
        },
        {
            AccountName: 'abc',
            AccountType: 'current',
            AccountNo: '7841254125841',
            IFSCCode: 'SBIN0011513',
            BankName: 'SBI',
            BranchName: 'Invalid ',
        },
        {
            AccountName: 'Vishal',
            AccountType: 'current',
            AccountNo: '5641254125841',
            IFSCCode: 'BOIN0011513',
            BankName: 'BOI',
            BranchName: 'Valid ',
        },
        {
            AccountName: 'abc',
            AccountType: 'current',
            AccountNo: '7841254125841',
            IFSCCode: 'SBIN0011513',
            BankName: 'SBI',
            BranchName: 'Invalid ',
        },
    ];

    constructor(private router: Router) {}
    navigateToAddBank() {
        this.router.navigate(['/institute/bank/add']);
    }
}
