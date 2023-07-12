import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../../services/state.service';
import { BankService } from '../../../services/bank.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FilterService } from 'src/app/services/filter.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-list-bank',
    templateUrl: './list-bank.component.html',
    styleUrls: ['./list-bank.component.scss'],
    providers: [ConfirmationService, DialogService],
})
export class ListBankComponent implements OnInit, OnDestroy {
    bank: any = [];
    items!: MenuItem[];
    schoolId: any;
    private dataSubscription!: Subscription;
    bankFilter!: FormGroup;
    saveOptions!: any[];

    constructor(
        private router: Router,
        private stateSvc: StateService,
        private bankSvc: BankService,
        private fb: FormBuilder,
        private filterSvc: FilterService,
        private msg: MessageService
    ) {}

    ngOnInit(): void {
        this.updateBankList();

        this.dataSubscription = this.stateSvc
            .getData()
            .subscribe((response: any) => {
                console.log('ins--->', response);
                this.updateBankList();
            });

        this.saveOptions = [
            {
                label: 'Download as Excel',
                icon: 'pi pi-file-excel',

                command: () => {
                    this.exportTableData('xlsx');
                },
            },
            {
                label: 'Download as CSV',
                icon: 'pi pi-file',
                command: () => {
                    this.exportTableData('csv');
                },
            },
        ];

        this.bankFilter = this.fb.group({
            accountname: [''],
            accounttype: [''],
            accountno: [''],
            ifsccode: [''],
            bankname: [''],
            branchname: [''],
        });
    }
    ngOnDestroy() {
        this.dataSubscription.unsubscribe();
    }
    async updateBankList() {
        this.schoolId = this.stateSvc.getUserData('schoolId');

        await this.bankSvc
            .getBanksBySchoolId(this.schoolId)
            .then((res: any) => {
                console.log(res, 'shivaniiiiiiiiiiiiiii');

                //close this after exiting bank component
                this.bank = res.data;
            });
    }
    navigateToAddBank() {
        this.router.navigate(['/main/institute/bank/add']);
    }

    handleClick(accNo: any) {
        console.log(event);

        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-pencil',
                routerLink: ['/main/institute/bank/add'],
                queryParams: { accNo: accNo },
                queryParamsHandling: 'merge',
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {},
            },
        ];
    }

    exportTableData(format: any) {
        // this.messageService.showSuccess('Your file is being downloaded. Please wait...');
        const rows = [];
        const columns = [
            'ACCOUNT NAME',
            'ACCOUNT TYPE',
            'ACCOUNT NO',
            'IFSC CODE',
            'BANK NAME',
            'BRANCH NAME',
            'ACTION',
        ];
        rows.push(columns);
        for (const bank of this.bank) {
            rows.push([
                bank.accountname,
                bank.accounttype,
                bank.accountno,
                bank.ifsccode,
                bank.bankname,
                bank.branchname,
            ]);
        }
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(rows);

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Bank');
        let bookType: any, fileName;
        if (format === 'csv') {
            bookType = 'csv';
            fileName = 'bank.csv';
        } else if (format === 'xlsx') {
            bookType = 'xlsx';
            fileName = 'bank.xlsx';
        }

        const buffer = XLSX.write(workbook, { bookType, type: 'array' });

        const file = new Blob([buffer], { type: 'application/octet-stream' });
        FileSaver.saveAs(file, fileName);
    }

    async filteredValues() {
        console.log(this.bankFilter.value);
        let data = {
            accountHolderName: this.bankFilter.value.accountname,
            accountType: this.bankFilter.value.accounttype,
            accountNo: this.bankFilter.value.accountno,
            ifsc: this.bankFilter.value.ifsccode,
            bankName: this.bankFilter.value.bankname,
        };

        try {
            const res: any = await this.filterSvc.bankFilter(data);
            console.log(data);

            if (res.status) {
                this.stateSvc.setUserData('userId', res.data);

                this.msg.add({
                    severity: 'success',
                    detail: 'shivaniiiiiiiiiiiii',
                });
            } else {
                this.msg.add({
                    severity: 'warn',
                    summary: 'error',
                    detail: 'Invalid shivaniiiiiiiiiii',
                });
                // this.loading = false;
            }

            console.log(res);
        } catch (error) {
            this.msg.add({
                severity: 'warn',
                summary: 'error',
                detail: 'Something went wrong',
            });
            console.error(error);
        }
    }
}
