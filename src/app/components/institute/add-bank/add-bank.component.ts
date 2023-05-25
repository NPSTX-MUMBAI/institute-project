import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-add-bank',
    templateUrl: './add-bank.component.html',
    styleUrls: ['./add-bank.component.scss'],
})
export class AddBankComponent implements OnInit {
    bankDetails!: FormGroup;
    constructor(private fb: FormBuilder) {}
    ngOnInit(): void {
        this.bankDetails = this.fb.group({
            name: ['', Validators.required],
            accountType: ['', Validators.required],
            ifscCode: ['', Validators.required],
            Accountno: ['', Validators.required],
            upi: ['', Validators.required],
            SID: ['', Validators.required],
            mid: ['', Validators.required],
            Bankname: ['', Validators.required],
            Branchname: ['', Validators.required],
            state: ['', Validators.required],
            district: ['', Validators.required],
            city: ['', Validators.required],
            center: ['', Validators.required],
            address: ['', Validators.required],
            Bankcode: ['', Validators.required],
        });
    }
    dropdownItems = [
        { name: 'Current account', code: 'Current account' },
        { name: 'Saving account', code: 'Saving account' },
        { name: 'Salary accoount', code: 'Salary accoount' },
        { name: 'FD accoount', code: 'FD  accoount' },
    ];
    submit() {
        console.log(this.bankDetails.value);
    }
}
