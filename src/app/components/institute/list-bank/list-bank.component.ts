import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-bank',
    templateUrl: './list-bank.component.html',
    styleUrls: ['./list-bank.component.scss'],
})
export class ListBankComponent {
    constructor(private router: Router) {}
    navigateToAddBank() {
        this.router.navigate(['/institute/bank/add']);
    }
}
