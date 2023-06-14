import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InstituteService } from '../../../services/institute.service';

interface City {
    name: string;
}

@Component({
    selector: 'app-add-std-div',
    templateUrl: './add-std-div.component.html',
    styleUrls: ['./add-std-div.component.scss'],
})
export class AddStdDivComponent implements OnInit {
    standards = [
        { name: 'I', div: 'A,B,C,D' },
        { name: 'II', div: 'A,B,C' },
        { name: 'III', div: 'A,B,C,D' },
        { name: 'IV', div: 'A,B,C,D,E' },
    ];
    divisions = [{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }];

    stds = [
        { name: 'I', div: 'A,B,C,D' },
        { name: 'II', div: 'A,B,C' },
        { name: 'III', div: 'A,B,C,D,E' },
    ];

    schoolId: any;

    addStdDiv!: FormGroup;
    show = false;

    constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.addStdDiv = this.fb.group({
            std: ['', Validators.required],
        });
    }
    submit() {
        let finalArray = [];

        this.schoolId = this.route.snapshot.queryParamMap.get('schoolId');
        console.log(this.addStdDiv.value.std);

        for (let i of this.addStdDiv.value.std) {
            finalArray.push(i.name);
        }

        let data = {
            schoolId: this.schoolId,
            std: finalArray,
        };
        console.log(data);

        this.show = true;
        this.stds = this.addStdDiv.value.std;
    }

    addDiv() {}
}
