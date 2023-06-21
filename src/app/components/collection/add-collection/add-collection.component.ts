import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
@Component({
    selector: 'app-add-collection',
    templateUrl: './add-collection.component.html',
    styleUrls: ['./add-collection.component.scss'],
})
export class AddCollectionComponent implements OnInit {
    collection!: FormGroup;

    constructor(private fb: FormBuilder) {}

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
}
