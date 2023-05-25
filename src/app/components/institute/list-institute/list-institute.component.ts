import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-institute',
    templateUrl: './list-institute.component.html',
    styleUrls: ['./list-institute.component.scss'],
})
export class ListInstituteComponent implements OnInit {
    value5: any;
    listInstitute!: FormGroup;
    //dropdownItems=[]

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
            pincode: '54321'
          },{
            name: 'PQR School',
            uniqueId: 3002,
            type: 'High School',
            city: 'Some City',
            pincode: '98765'
          }, {
            name: 'LMN School',
            uniqueId: 4003,
            type: 'Elementary',
            city: 'Different City',
            pincode: '24680'
          },{
            name: 'EFG School',
            uniqueId: 5004,
            type: 'Middle School',
            city: 'New City',
            pincode: '13579'
          },{
            name: 'GHI School',
            uniqueId: 6005,
            type: 'Public',
            city: 'Cityville',
            pincode: '86420'
          },{
            name: 'JKL School',
            uniqueId: 7006,
            type: 'Private',
            city: 'Townsville',
            pincode: '97531'
          },{
            name: 'MNO School',
            uniqueId: 8007,
            type: 'International',
            city: 'Global City',
            pincode: '75319'
          }
    ];

    constructor(private fb: FormBuilder, private router: Router) {}
    ngOnInit(): void {
        this.listInstitute = this.fb.group({
            instituteName: ['', Validators.required],
            instituteType: ['', Validators.required],
            institutephoneno: ['', Validators.required],
            institutewebsite: ['', Validators.required],
            instituteemail: ['', Validators.required],
            instituteboard: ['', Validators.required],
            institutestd: ['', Validators.required],
            institutediv: ['', Validators.required],

            spocname: ['', Validators.required],
            spocphone: ['', Validators.required],
            spocemail: ['', Validators.required],

            address1: ['', Validators.required],
            address2: ['', Validators.required],
            zipcode: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            location: ['', Validators.required],

            instpan: ['', Validators.required],
            instregno: ['', Validators.required],
            instgstno: ['', Validators.required],
        });
    }
    submit() {
        console.log(this.listInstitute.value);
    }

    dropdownItems = [
        { name: 'Select Type' },
        { name: 'Bank' },
        { name: 'School' },
        { name: 'Jr School' },
    ];
    AddInstitute() {
        this.router.navigate(['/institute/add']);
    }
}
