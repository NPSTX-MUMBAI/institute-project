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
            name: 'NPST Test School',
            uniqueId: 1000,
            type: 'Primary',
            board: 'State',
            phone: '1234567890',

            city: 'Mumbai',
            state: 'Maharashtra',
            action: 'Edit',
        },
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
