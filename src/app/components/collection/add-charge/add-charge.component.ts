import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

import { DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
    selector: 'app-add-charge',
    templateUrl: './add-charge.component.html',
    styleUrls: ['./add-charge.component.scss'],
})
export class AddChargeComponent implements OnInit {

    constructor(private fb: FormBuilder, public ref: DynamicDialogRef) {}

    addCharge!: FormGroup;
   


    ngOnInit(): void {
        this.addCharge = this.fb.group({
            chargeName: ['', Validators.required],
            description: ['',  Validators.required],
            rate: ['',  Validators.required],
        });
    }


   

    save() {
       
        
        this.selectCharge(this.addCharge.value);
       
        
    }
    
    
    selectCharge(charge: any) {
        this.ref.close(charge);
    }
}
