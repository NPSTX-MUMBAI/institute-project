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
