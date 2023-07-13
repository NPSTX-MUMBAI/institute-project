import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AddChargeComponent } from '../add-charge/add-charge.component';
import { Student } from 'src/app/models/student.model';
import { Router } from '@angular/router';

import * as moment from 'moment';
@Component({
    selector: 'app-add-collection',
    templateUrl: './add-collection.component.html',
    styleUrls: ['./add-collection.component.scss'],
    providers: [DialogService, MessageService],
})
export class AddCollectionComponent implements OnInit, OnDestroy {
    collection!: FormGroup;
    ref: DynamicDialogRef | undefined;
    students: Student[] = [];
    checked: boolean = false;
    recurringValue!: boolean;
    myCharge: any[] = [];
    checkedStudentValue!: string;
    studentObj!: any[];
    constructor(
        private fb: FormBuilder,
        public dialogService: DialogService,
        public messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.collection = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            chargeGp: ['', Validators.required],
            Channels: ['', Validators.required],
            Vpa: ['', Validators.required],
            freq: ['', Validators.required],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            raisingDate: ['', Validators.required],
            invoiceDate: ['', Validators.required],
            dueDate: ['', Validators.required],
            autoRaising: [null, Validators.required],
        });
        const storedData = localStorage.getItem('myChargeData');
        if (storedData) {
            this.myCharge = JSON.parse(storedData);
        } else {
            this.myCharge = []; // Initialize the array if no data is found
        }
    }
    doSomething() {
        const checkboxValue = this.collection.value.autoRaising;
        // console.log('checkboxValue:', checkboxValue);
        const booleanValue = checkboxValue[0] === 'true'; // Convert to boolean
        console.log('booleanValue:', booleanValue);
        this.recurringValue = booleanValue;

        // console.log(this.collection.value.autoRaising);
    }
    dateFormat(date: Date) {
        const inputDate = moment(date, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        const formattedDate = inputDate.format('YYYY-MM-DD');
        this.collection.get('raisingDate')?.patchValue(formattedDate);

        console.log(formattedDate, 'hiiiiiiiiiiiiiiiiiiiiii');
    }
    EnddateFormat(date: Date) {
        const inputDate = moment(date, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        const formattedDate = inputDate.format('YYYY-MM-DD');
        this.collection.get('endDate')?.patchValue(formattedDate);

        console.log(formattedDate, 'hiiiiiiiiiiiiiiiiiiiiii');
    }
    startDateFormat(date: Date) {
        const inputDate = moment(date, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        const formattedDate = inputDate.format('YYYY-MM-DD');
        this.collection.get('startDate')?.patchValue(formattedDate);

        console.log(formattedDate, 'hiiiiiiiiiiiiiiiiiiiiii');
    }
    invoiceDateformat(date: Date) {
        const inputDate = moment(date, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        const formattedDate = inputDate.format('YYYY-MM-DD');
        this.collection.get('invoiceDate')?.patchValue(formattedDate);

        console.log(formattedDate, 'hiiiiiiiiiiiiiiiiiiiiii');
    }
    dueDateformat(date: Date) {
        const inputDate = moment(date, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        const formattedDate = inputDate.format('YYYY-MM-DD');
        this.collection.get('dueDate')?.patchValue(formattedDate);

        console.log(formattedDate, 'hiiiiiiiiiiiiiiiiiiiiii');
    }
    submit() {
        // let tempObj = [];
        // tempObj.push(this.checkedStudentValue);
        // tempObj.forEach((el: any) => {
        //     this.studentObj.push({
        //         fullName: el.firstname + el.lastName,
        //         mobileNo: el.mobileNo,
        //         email: el.email,
        //         userId: el.studentId,
        //     });
        // });

        console.log(
            this.collection.value,
            this.myCharge,
            this.checkedStudentValue
        );

        let collgrp = this.collection.value;

        let frequency = this.collection.value.freq.name;
        collgrp.frequency = frequency;
        delete collgrp.freq;

        let chargeGroup = this.collection.value.chargeGp.name;
        collgrp.chargeGroup = chargeGroup;
        delete collgrp.chargeGp;

        let vpa = this.collection.value.Vpa.name;
        collgrp.vpa = vpa;
        delete collgrp.Vpa;

        let channels = this.collection.value.Channels.name;
        collgrp.channels = channels;
        delete collgrp.Channels;

        // const startDates = this.collection.value.StartDate;
        // const formattedDate = startDates
        //     .toLocaleDateString('en-GB', {
        //         year: 'numeric',
        //         month: '2-digit',
        //         day: '2-digit',
        //     })
        //     .replace(/\//g, '-');
        // console.log(formattedDate);

        // let startDate = formattedDate;
        // collgrp.startDate = startDate;

        // delete collgrp.StartDate;

        // const endDates = this.collection.value.EndDate;
        // const formattedEnddate = endDates
        //     .toLocaleDateString('en-GB', {
        //         year: 'numeric',
        //         month: '2-digit',
        //         day: '2-digit',
        //     })
        //     .replace(/\//g, '-');
        // let endDate = formattedEnddate;
        // collgrp.endDate = endDate;

        // delete collgrp.EndDate;

        console.log(collgrp);
    }
    chargeItems = [{ name: 'test group' }];
    rasieSource = [
        { name: '' },
        { name: 'whatsapp' },
        { name: 'email' },
        { name: 'sms' },
    ];
    vpaId = [{ name: 'shivani@cosbi' }];
    frequencyMonth = [
        { name: '1' },
        { name: '2' },
        { name: '3' },
        { name: '4' },
    ];

    show() {
        this.ref = this.dialogService.open(AddChargeComponent, {
            header: 'Add a charge',
            // width: '40%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        });

        this.ref.onClose.subscribe((charge: any) => {
            if (charge) {
                console.log(charge);

                this.myCharge.push(charge);
                // console.log(this.myCharge,"shivaniiiiiiiiiiiiiii");
                // localStorage.setItem(
                //     'myChargeData',
                //     JSON.stringify(this.myCharge)
                // );
                // console.log(this.myCharge,"shivaniiiiiiiiiiiiiii");
                // localStorage.setItem('myChargeData', JSON.stringify(this.myCharge));

                this.messageService.add({
                    severity: 'info',
                    summary: 'Product Selected',
                    detail: charge.name,
                });
            }

            // this.myCharge= [
            //{ column1: 'Value 1' , column2: 'Value 2' },
            //{ column1: 'Value 3', column2: 'Value 4' },
            // Add more data rows here
            //];

            console.log(this.myCharge);
        });

        this.ref.onMaximize.subscribe((value) => {
            this.messageService.add({
                severity: 'info',
                summary: 'Maximized',
                detail: `maximized: ${value.maximized}`,
            });
        });
    }

    ngOnDestroy() {
        if (this.ref) {
            this.ref.close();
        }
    }
    onSelectedStudent2(ev: any) {
        console.log('event select2--->', ev);

        this.checkedStudentValue = ev;
    }
    navigateToRoute() {
        this.router.navigateByUrl('/main/collection/list');
    }
}
