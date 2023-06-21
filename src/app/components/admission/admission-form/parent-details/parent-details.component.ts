import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    Validators,
    FormBuilder,
} from '@angular/forms';
import { log } from 'console';
import { ParentsDetails } from 'src/app/models/admission.model';
import { AdmissionService } from 'src/app/services/admission.service';
import { StateService } from 'src/app/services/state.service';

@Component({
    selector: 'app-parent-details',
    templateUrl: './parent-details.component.html',
    styleUrls: ['./parent-details.component.scss'],
})
export class ParentDetailsComponent implements OnInit {
    value5: any;
    //dropdownItems:any;
    ParentsDetails!: FormGroup;
    constructor(
        private fb: FormBuilder,
        private admissionSrv: AdmissionService,
        private stateSrv: StateService
    ) {}
    ngOnInit(): void {
        this.ParentsDetails = this.fb.group({
            fatherFirstName: ['', Validators.required],
            fatherLastName: ['', Validators.required],

            fatherEmail: ['', Validators.required],

            fatherPhone: ['', Validators.required],

            fatherOccupation: ['', Validators.required],

            fatherReligion: ['', Validators.required],

            fatherNationality: ['', Validators.required],

            fatherAddress: ['', Validators.required],

            Country: ['', Validators.required],

            state: ['', Validators.required],

            City: ['', Validators.required],

            Zip: new FormControl('', Validators.required),

            motherFirstName: ['', Validators.required],

            motherLastName: ['', Validators.required],

            motherEmail: ['', Validators.required],

            motherPhone: ['', Validators.required],

            motherOccupation: ['', Validators.required],

            motherReligion: ['', Validators.required],

            motherNationality: ['', Validators.required],

            motherAddress: ['', Validators.required],

            MCountry: ['', Validators.required],

            Mstate: ['', Validators.required],

            MCity: ['', Validators.required],

            MZip: ['', Validators.required],

            guardianFirstName: ['', Validators.required],
            guardianLastName: ['', Validators.required],

            guardianEmail: ['', Validators.required],

            guardianPhone: ['', Validators.required],

            guardianOccupation: ['', Validators.required],

            guardianReligion: ['', Validators.required],

            guardianNationality: ['', Validators.required],

            guardianAddress: ['', Validators.required],

            GCountry: ['', Validators.required],

            Gstate: ['', Validators.required],

            GCity: ['', Validators.required],

            GZip: ['', Validators.required],
        });
    }

    submit() {
        if (this.ParentsDetails.invalid) {
            alert('Invalid Form');
            return;
        }
        console.log(this.ParentsDetails.value);
        const data = this.ParentsDetails.value;
        const applicationId = this.stateSrv.applicationId;
        console.log(applicationId);
        const parentDetailsObj: ParentsDetails = {
            applicationId: applicationId,
            fatherFirstName: data.fatherFirstName,
            fatherLastName: data.fatherLastName,
            fatherEmail: data.fatherEmail,
            fatherPhone: data.fatherPhone,
            fatherAddress: data.fatherAddress,
            fatherNationality: data.fatherNationality,
            fatherOccupation: data.fatherOccupation,
            motherFirstName: data.motherFirstName,
            motherLastName: data.motherLastName,
            motherEmail: data.motherEmail,
            motherPhone: data.motherPhone,
            motherAddress: data.motherAddress,
            motherNationality: data.motherNationality,
            motherOccupation: data.motherOccupation,
            motherReligion: data.motherReligion,
            guardianFirstName: data.guardianFirstName,
            guardianLastName: data.guardianLastName,
            guardianEmail: data.guardianEmail,
            guardianPhone: data.guardianPhone,
            guardianAddress: data.guardianAddress,
            guardianNationality: data.guardianNationality,
            guardianOccupation: data.guardianOccupation,
            guardianReligion: data.guardianReligion,
        };
        this.admissionSrv.saveParentDetails(parentDetailsObj).then((res) => {
            console.log(res);
        });
    }

    dropdownItems = [
        { name: 'Select State', code: 'Select State' },
        { name: 'Maharashtra', code: 'Maharashtra' },
        { name: 'Karnatak', code: 'Karnatak' },
        { name: 'Gujarat', code: 'Gujarat' },
    ];
}
