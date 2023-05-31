import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { BankInfoModel } from 'src/app/models/bank.info.model';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-bank-info',
    templateUrl: './bank-info.component.html',
    styleUrls: ['./bank-info.component.scss'],
})
export class BankInfoComponent implements OnInit {
    bankDetails!: FormGroup;
    constructor(private fb: FormBuilder, private msg: MessageService) {}
    ngOnInit(): void {
        this.bankDetails = this.fb.group({
            name: ['', Validators.required],
            accountType: ['', Validators.required],
            ifscCode: ['', Validators.required],
            accountNo: ['', Validators.required],
            // upi: ['', Validators.required],
            // SID: ['', Validators.required],
            // mid: ['', Validators.required],
            bankName: ['', Validators.required],
            branchName: ['', Validators.required],
            state: ['', Validators.required],
            district: ['', Validators.required],
            city: ['', Validators.required],
            // center: ['', Validators.required],
            // address: ['', Validators.required],
            // Bankcode: ['', Validators.required],
        });
    }
    dropdownItems = [
        { name: 'Current account', code: 'Current account' },
        { name: 'Saving account', code: 'Saving account' },
        { name: 'Salary accoount', code: 'Salary accoount' },
        { name: 'FD accoount', code: 'FD  accoount' },
    ];
    submit() {
        if (this.bankDetails.invalid) {
            this.msg.add({
                severity: 'error',
                summary: 'Invalid',
                detail: 'All fileds Required',
            });
            return;
        }
        console.log(this.bankDetails.value);
        const data = this.bankDetails.value;
        const bankDetailsObj: BankInfoModel = {
            accountHolderName: data.accountHolderName,
            accountType: data.accountType,
            accountNo: data.accountNo,
            ifsc: data.ifsc,
            bankname: data.bankname,
            branch: data.branch,
            state: data.state,
            district: data.district,
            city: data.city,
            pinCode: data.pinCode,
        };
    }
}
