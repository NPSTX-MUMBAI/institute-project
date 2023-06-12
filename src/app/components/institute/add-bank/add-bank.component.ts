import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService } from '../../../services/bank.service';
import { StateService } from '../../../services/state.service';
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
    accNo: any;

    bank: any;
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private bankSvc: BankService,
        private stateSvc: StateService
    ) {}
    ngOnInit(): void {
        let i = 0;

        this.accNo = this.route.snapshot.queryParamMap.get('accNo');
        console.log(this.accNo);

        this.fetchBankDetails().then(() => {
            switch (this.bank.accountType) {
                case 'Current account':
                    i = 0;
                    break;
                case 'Saving account':
                    i = 1;
                    break;
                case 'Salary account':
                    i = 2;
                    break;
            }
            this.bankDetails = this.fb.group({
                name: [this.bank.accountHolderName, Validators.required],
                accountType: [this.dropdownItems[i], Validators.required],
                ifscCode: [this.bank.ifsc, Validators.required],
                Accountno: [this.bank.accountNo, Validators.required],
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
        });
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

    async fetchBankDetails() {
        let data: any;

        data = {
            schoolId: this.stateSvc.getUserData('schoolId'),
            accountNo: this.accNo,
        };
        await this.bankSvc.getBankDetailsById(data).then((res: any) => {
            this.bank = res.data[0];
            console.log(this.bank);
        });
        return true;
    }
    dropdownItems = [
        { name: 'Current account', code: 'Current account' },
        { name: 'Saving account', code: 'Saving account' },
        { name: 'Salary account', code: 'Salary account' },
        { name: 'FD account', code: 'FD  account' },
    ];
    submit() {
        console.log(this.bankDetails.value);
    }
}
