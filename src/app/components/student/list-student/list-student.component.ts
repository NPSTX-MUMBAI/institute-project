import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-student',
    templateUrl: './list-student.component.html',
    styleUrls: ['./list-student.component.scss'],
})
<<<<<<< HEAD
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

=======
export class ListStudentComponent {


  school: any = [
    {
      FirstName: 'Primary',
      RegId: 1000,
      LastName: 'Example',
      RollNo: 4,
      Gender:'Male',
      Std: 5,
      Div: 'A',
      Board: 'CBSE',
      Email:'abc5@gmail.com',
      Phone: 9658455232,
      
    },

     {
      FirstName: 'Mary',
      RegId: 2000,
      LastName: 'Examp',
      RollNo: 6,
      Gender:'Female',
      Std: 6,
      Div: 'B',
      Board: 'Stateboard',
      Email:'abc8@gmail.com',
      Phone: 9658455232,
      
    },

    {
      FirstName: 'Secondary',
      RegId: 4000,
      LastName: 'Example',
      RollNo: 8,
      Gender:'Female',
      Std: 6,
      Div: 'A',
      Board: 'CBSE',
      Email:'abc2@gmail.com',
      Phone: 9658455223,
      
    },

    {
      FirstName: 'Ray',
      RegId: 3000,
      LastName: 'ample',
      RollNo: 1,
      Gender:'Male',
      Std: 9,
      Div: 'C',
      Board: 'State Board',
      Email:'abc@2gmail.com',
      Phone: 9658455233,
      
    },

    {
      FirstName: 'Pri',
      RegId: 1100,
      LastName: 'Example',
      RollNo: 4,
      Gender:'Male',
      Std: 7,
      Div: 'C',
      Board: 'CBSE',
      Email:'ab89@gmail.com',
      Phone: 9658455222,
      
    },

    {
      FirstName: 'Joe',
      RegId: 5000,
      LastName: 'Work',
      RollNo: 4,
      Gender:'Female',
      Std: 9,
      Div: 'D',
      Board: 'Stateboard',
      Email:'abc99@gmail.com',
      Phone: 7854855242,
      
    }

    ]
>>>>>>> 5965e04a36ac63672ec5ab5a72637ac51f2c32f3
    constructor(private router: Router) {}
    ngOnInit(): void {}
    navigateToAddStudents() {
        this.router.navigate(['/student/add']);
    }
}
