import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { BankInfoModel } from 'src/app/models/bank.info.model';
import { MessageService } from 'primeng/api';
import { BankService } from 'src/app/services/bank.service';
import { StateService } from '../../../services/state.service';
import { Bank } from 'src/app/models/bank.model';

@Component({
    selector: 'app-bank-info',
    templateUrl: './bank-info.component.html',
    styleUrls: ['./bank-info.component.scss'],
})
export class BankInfoComponent implements OnInit {
    @Output() onSaveBankInfo = new EventEmitter();
    submitted = false;

    bankDetails!: FormGroup;
    loading = false;
    toggleDisplay: boolean = false;
    constructor(
        private fb: FormBuilder,
        private msg: MessageService,
        private bankSvc: BankService,
        private stateSvc: StateService
    ) {}
    ngOnInit(): void {
        this.bankDetails = this.fb.group({
            accountHolderName: ['', Validators.required],
            accountType: ['', Validators.required],
            ifsc: ['', Validators.required],
            accountNo: ['', Validators.required],
            upi: ['', Validators.required],
            // SID: ['', Validators.required],
            // mid: ['', Validators.required],
            bankname: ['', Validators.required],
            branch: ['', Validators.required],
            state: ['', Validators.required],
            district: ['', Validators.required],
            city: ['', Validators.required],

            pinCode: ['', Validators.required],
            // center: ['', Validators.required],
            // address: ['', Validators.required],
            // Bankcode: ['', Validators.required],
        });
    }
    dropdownItems = [
        { name: 'Current account', code: 'Current account' },
        { name: 'Saving account', code: 'Saving account' },
        { name: 'Salary account', code: 'Salary account' },
        { name: 'FD account', code: 'FD  account' },
    ];
    async submit() {
        this.submitted = true;

        let mySchoolId = this.stateSvc.getUserData('schoolId');
        this.loading = true;
        if (this.bankDetails.invalid) {
            this.msg.add({
                severity: 'error',
                summary: 'Invalid',
                detail: 'All fileds Required',
            });
            this.loading = false;
            return;
        }
        let myBank = this.bankDetails.value;
        const bankDetailsObj: BankInfoModel = {
            accountHolderName: myBank.accountHolderName,
            accountType: myBank.accountType.name,
            accountNo: myBank.accountNo,
            ifsc: myBank.ifsc,
            bankname: myBank.bankname,
            branch: myBank.branch,
            state: myBank.state,
            district: myBank.district,
            city: myBank.city,
            pinCode: myBank.pinCode,
        };

        let myData = {
            schoolId: mySchoolId,
            bank: bankDetailsObj,
        };
        console.log(myData, '<<<<<<');

        if (myData) {
            this.onSaveBankInfo.emit(myData);
        }
    }

    getBank() {
        let ifscCode = this.bankDetails.controls['ifsc'].value.toUpperCase();
        console.warn('ifsc:', ifscCode);

        this.bankSvc.findBankByIFSCCode(ifscCode).subscribe((data: Bank) => {
            let myPin = data.address?.slice(-7);
            this.bankDetails.get('branch')?.setValue(data.branch);
            this.bankDetails.get('bankname')?.setValue(data.bankname);
            this.bankDetails.get('state')?.setValue(data.state);
            this.bankDetails.get('district')?.setValue(data.district);
            this.bankDetails.get('city')?.setValue(data.city);
            this.bankDetails.get('centre')?.setValue(data.centre);
            this.bankDetails.get('address')?.setValue(data.address);
            this.bankDetails.get('bankCode')?.setValue(data.bankCode);
            this.bankDetails.get('pinCode')?.setValue(myPin);

            this.toggleDisplay = true;
        });
    }
}
