import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/demo/service/address.service';
import {
    AddressDetails,
    PostOffice,
} from 'src/app/models/addressDetails.models';
import { InstituteService } from '../../../services/institute.service';

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
    schoolId: any;
    institute: any;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private instSvc: InstituteService,
        private route: ActivatedRoute
    ) {}
    ngOnInit(): void {
        let i = 0;
        this.schoolId = this.route.snapshot.queryParamMap.get('schoolId');
        console.log(this.schoolId);
        this.fetchInstitute().then(() => {
            switch (this.institute.instituteType) {
                case 'Bank':
                    i = 0;
                    break;
                case 'School':
                    i = 1;
                    break;
                case 'JrCollege':
                    i = 2;
                    break;
            }

            this.listInstitute = this.fb.group({
                instituteName: [
                    this.institute.instituteName,
                    Validators.required,
                ],
                instituteType: [this.dropdownItems[i], Validators.required],
                institutePhone: [
                    this.institute.institutePhone,
                    Validators.required,
                ],
                instituteWebsite: [
                    this.institute.instituteWebsite,
                    Validators.required,
                ],
                instituteEmail: [
                    this.institute.instituteEmail,
                    Validators.required,
                ],
                instituteBoard: ['', Validators.required],
                instituteStd: ['', Validators.required],
                instituteDiv: ['', Validators.required],

                spocName: ['', Validators.required],
                spocPhone: ['', Validators.required],
                spocEmail: ['', Validators.required],

                line1: [this.institute.line1, Validators.required],
                line2: [this.institute.line2, Validators.required],
                zipcode: [this.institute.zipCode, Validators.required],
                country: [this.institute.country, Validators.required],
                state: [this.institute.state, Validators.required],
                city: [this.institute.city, Validators.required],
            });
        });

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
            city: ['', Validators.required],
        });
    }

    async fetchInstitute() {
        await this.instSvc
            .getInstituteDetails(this.schoolId)
            .then((res: any) => {
                const finalArray = [];

                for (const item of res.data) {
                    const schoolData = {
                        ...item.school,
                        ...item.address,
                        ...item.board,
                    };
                    finalArray.push(schoolData);
                }
                this.institute = finalArray[0];

                console.log(this.institute);
            });
        return true;
    }
    submit() {
        console.log(this.listInstitute.value);
    }

    dropdownItems = [
        { name: 'Bank' },
        { name: 'School' },
        { name: 'JrCollege' },
    ];
    AddInstitute() {
        this.router.navigate(['/main/institute/add']);
    }
}
