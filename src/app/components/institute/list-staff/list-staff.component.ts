import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-staff',
    templateUrl: './list-staff.component.html',
    styleUrls: ['./list-staff.component.scss'],
})
export class ListStaffComponent {
    constructor(private router: Router) {}
    navigateToAddBank() {
        this.router.navigate(['/institute/staff/add']);
    }
}
