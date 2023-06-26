import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
@Component({
    selector: 'app-add-charge',
    templateUrl: './add-charge.component.html',
    styleUrls: ['./add-charge.component.scss'],
})
export class AddChargeComponent implements OnInit {
    constructor(private fb: FormBuilder) {}

    addCharge!: FormGroup;

    ngOnInit(): void {
        this.addCharge = this.fb.group({
            chargeName: [''],
            description: [''],
            rate: [''],
        });
    }

    save() {
console.log( this.addCharge.value)


    }
}
