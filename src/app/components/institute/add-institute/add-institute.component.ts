import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-institute',
    templateUrl: './add-institute.component.html',
    styleUrls: ['./add-institute.component.scss'],
})
export class AddInstituteComponent implements OnInit {
    listInstitute!: FormGroup;
    standard = [{ name: 'I' }, { name: 'II' }, { name: 'III' }];
    boards = [{ name: 'CBSE' }, { name: 'ICSE' }, { name: 'MSBSE' }];
    division = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];

    constructor(private fb: FormBuilder, private router: Router) {}
    ngOnInit(): void {
        this.listInstitute = this.fb.group({
            instituteName: ['', Validators.required],
            instituteType: ['', Validators.required],
            institutePhone: ['', Validators.required],
            instituteWebsite: ['', Validators.required],
            instituteEmail: ['', Validators.required],
            instituteBoard: ['', Validators.required],
            instituteStd: ['', Validators.required],
            instituteDiv: ['', Validators.required],

            spocName: ['', Validators.required],
            spocPhone: ['', Validators.required],
            spocEmail: ['', Validators.required],

            line1: ['', Validators.required],
            line2: ['', Validators.required],
            zipcode: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            location: ['', Validators.required],

            instpan: ['', Validators.required],
            instRegno: ['', Validators.required],
            instGstno: ['', Validators.required],
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
