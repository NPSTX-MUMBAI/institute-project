import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-student',
    templateUrl: './list-student.component.html',
    styleUrls: ['./list-student.component.scss'],
})
export class ListStudentComponent implements OnInit {
    value5: any;

    school: any = [
        {
            name: 'ABC School',
            uniqueId: 1000,
            type: 'Primary',
            city: 'Example City',
            pincode: '12345',
        },
        {
            name: 'XYZ School',
            uniqueId: 2001,
            type: 'Secondary',
            city: 'Another City',
            pincode: '54321',
        },
        {
            name: 'PQR School',
            uniqueId: 3002,
            type: 'High School',
            city: 'Some City',
            pincode: '98765',
        },
        {
            name: 'LMN School',
            uniqueId: 4003,
            type: 'Elementary',
            city: 'Different City',
            pincode: '24680',
        },
        {
            name: 'EFG School',
            uniqueId: 5004,
            type: 'Middle School',
            city: 'New City',
            pincode: '13579',
        },
        {
            name: 'GHI School',
            uniqueId: 6005,
            type: 'Public',
            city: 'Cityville',
            pincode: '86420',
        },
        {
            name: 'JKL School',
            uniqueId: 7006,
            type: 'Private',
            city: 'Townsville',
            pincode: '97531',
        },
        {
            name: 'MNO School',
            uniqueId: 8007,
            type: 'International',
            city: 'Global City',
            pincode: '75319',
        },
    ];

    constructor(private router: Router) {}
    ngOnInit(): void {}
    navigateToAddStudents() {
        this.router.navigate(['/student/add']);
    }
}
