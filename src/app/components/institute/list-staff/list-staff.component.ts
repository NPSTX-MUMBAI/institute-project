import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-staff',
    templateUrl: './list-staff.component.html',
    styleUrls: ['./list-staff.component.scss'],
})
export class ListStaffComponent {
    staff: any =[
        {
            FirstName:'Amit', 
            LastName:'Sharma',
            Email:'amit@gmail.com',
            MobileNo:'8989565623', 
        },
        {
            FirstName:'Meet', 
            LastName:'Varma',
            Email:'meet@gmail.com',
            MobileNo:'5969565623', 
        },
        {
            FirstName:'Yash', 
            LastName:'Sharma',
            Email:'yash@gmail.com',
            MobileNo:'9989565125', 
        },{
            FirstName:'yuvi', 
            LastName:'Sharma',
            Email:'yvi@gmail.com',
            MobileNo:'6689565626', 
        },
    ]
    constructor(private router: Router) {}
    navigateToAddBank() {
        this.router.navigate(['/institute/staff/add']);
    }
}
