import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-institute-info',
    templateUrl: './institute-info.component.html',
    styleUrls: ['./institute-info.component.scss'],
})
export class InstituteInfoComponent implements OnInit {
    listInstitute!: FormGroup;
    //dropdownItems=[]

    constructor(private fb: FormBuilder) {}
    ngOnInit(): void {
        this.listInstitute = this.fb.group({
            instituteName: ['', Validators.required],
            instituteType: ['', Validators.required],
            institutephoneno: ['', Validators.required],
            institutewebsite: ['', Validators.required],
            instituteemail: ['', Validators.required],
            instituteboard: ['', Validators.required],
            address1: ['', Validators.required],
            address2: ['', Validators.required],
            pincode: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],

            location: ['', Validators.required],
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
}
