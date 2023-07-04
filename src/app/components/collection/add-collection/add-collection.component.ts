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
        const storedData = localStorage.getItem('myChargeData');
        if (storedData) {
          this.myCharge = JSON.parse(storedData);
        } else {
          this.myCharge = []; // Initialize the array if no data is found
        }
      
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
                localStorage.setItem('myChargeData', JSON.stringify(this.myCharge)); 

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
}
