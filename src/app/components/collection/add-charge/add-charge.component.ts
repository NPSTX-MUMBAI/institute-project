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
    submitted = false;

    ngOnInit(): void {
        this.addCharge = this.fb.group({
            chargeName: ['', Validators.required],
            description: ['', Validators.required],
            rate: ['', Validators.required],
        });
    }

    save() {
        this.submitted = true;

        // console.log(this.addCharge.value, 'shivaniiiiiiiiiiii');

        // this.selectCharge(this.addCharge.value);
        
        const chargeName = this.addCharge.value.chargeName;
        const rate = this.addCharge.value.rate;


        if (chargeName && rate) {
            const charge = this.addCharge.value;
            this.selectCharge(charge);
            // Perform additional save operations (e.g., saving to a table)
            console.log('Data saved successfully!');
          } else {
            if (!chargeName) {
              console.log('Please enter the Charge Name.');
            }
            if (!rate) {
              console.log('Please enter the Rate.');
            }
          }
        }
        
        selectCharge(charge: any) {
          const chargeName = this.addCharge.value.chargeName;
          const rate = this.addCharge.value.rate;
        
          if (chargeName && rate) {
            this.ref.close(charge);
          }
         

        

        
         
         
       
    }

   /* selectCharge(charge: any) {
        this.ref.close(charge);
    }*/
}
