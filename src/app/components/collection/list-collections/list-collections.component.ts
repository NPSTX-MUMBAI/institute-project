import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
@Component({
    selector: 'app-list-collections',
    templateUrl: './list-collections.component.html',
    styleUrls: ['./list-collections.component.scss'],
})
export class ListCollectionsComponent implements OnInit {
    data: any[]; // Replace `any` with the appropriate type for your data structure
    collection!: FormGroup;

    constructor(private router: Router, private fb: FormBuilder) {
        this.data = [
            {
                NAME: 'collection name',
                DESCRIPTION: 'Description',
                RAISINGDAY: '10',
                FREQUENCY: '10',
                SOURCES: 'Email',
                ACTION: 'DELETE',
            },
            {
                NAME: 'collection name',
                DESCRIPTION: 'Description',
                RAISINGDAY: '10',
                FREQUENCY: '10',
                SOURCES: 'Email',
                ACTION: 'DELETE',
            },
            {
                NAME: 'collection name',
                DESCRIPTION: 'Description',
                RAISINGDAY: '10',
                FREQUENCY: '10',
                SOURCES: 'Email',
                ACTION: 'DELETE',
            },
            {
                NAME: 'collection name',
                DESCRIPTION: 'Description',
                RAISINGDAY: '10',
                FREQUENCY: '10',
                SOURCES: 'Email',
                ACTION: 'DELETE',
            },
            {
                NAME: 'collection name',
                DESCRIPTION: 'Description',
                RAISINGDAY: '10',
                FREQUENCY: '10',
                SOURCES: 'Email',
                ACTION: 'DELETE',
            },
            {
                NAME: 'collection name',
                DESCRIPTION: 'Description',
                RAISINGDAY: '10',
                FREQUENCY: '10',
                SOURCES: 'Email',
                ACTION: 'DELETE',
            },
        ];
    }

    ngOnInit(): void {
        this.collection = this.fb.group({
            name: ['', Validators.required],
            raisingDay: ['', Validators.required],
            frequency: ['', Validators.required],
        });
    }
    submit() {
        console.log(this.collection.value);
    }

    addCollection() {
        this.router.navigate(['main/collection/add']);
    }
}
