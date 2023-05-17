import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-student-details',
    templateUrl: './student-details.component.html',
    styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent {
    value5: any;

    studentDetails = new FormGroup({
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        dob: new FormControl('', Validators.required),
        nationality: new FormControl('', Validators.required),
        religion: new FormControl('', Validators.required),
        birthPlace: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        Std: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
    });
    submit() {
        console.log(this.studentDetails.value);
    }
}
