import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { AddChargeComponent } from '../add-charge/add-charge.component';
@Component({
    selector: 'app-add-collection',
    templateUrl: './add-collection.component.html',
    styleUrls: ['./add-collection.component.scss'],
    providers: [DialogService, MessageService],
})
export class AddCollectionComponent implements OnInit, OnDestroy {
    collection!: FormGroup;
    ref: DynamicDialogRef | undefined;

    myCharge: any[] = [];
    constructor(
        private fb: FormBuilder,
        public dialogService: DialogService,
        public messageService: MessageService
    ) {}

    ngOnInit(): void {
        this.collection = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            chargeGroups: ['', Validators.required],
            sources: ['', Validators.required],
            vpa: ['', Validators.required],
            freq: ['', Validators.required],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            notificationDate: ['', Validators.required],
            invoiceDate: ['', Validators.required],
            dueDate: ['', Validators.required],
        });
    }

    submit() {
        console.log(this.collection.value);
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
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: true,
        });

        this.ref.onClose.subscribe((charge: any) => {
            if (charge) {
                console.log(charge);

                this.myCharge.push(charge);
                this.messageService.add({
                    severity: 'info',
                    summary: 'Product Selected',
                    detail: charge.name,
                });
            }
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
}
