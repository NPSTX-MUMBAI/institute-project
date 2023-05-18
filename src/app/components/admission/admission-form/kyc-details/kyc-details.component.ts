import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-kyc-details',
    templateUrl: './kyc-details.component.html',
    styleUrls: ['./kyc-details.component.scss'],
})
export class KycDetailsComponent implements OnInit {
    value!: string;
    gstFile: any[] = [];
    kycGrp!: FormGroup;
    messageService: any;
    onKycUpload: any;
    panFile: any[] = [];
    udymaFile: any[] = [];
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        // this.kycGrp = this.fb.group({
        //     panNo: ['', [Validators.required]],
        //     gstNo: ['', [Validators.required]],
        //     udyam: ['', [Validators.required]],
        // });
    }

    panDetailsUpload(event: any, fileUpload: any) {
        if (this.kycGrp.controls['panNo'].invalid) {
            this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: 'Pan Card Number Required',
            });
        }
        // else {
        //     this.onKycUpload.emit({
        //         event,
        //         type: KycType.PAN_CARD,
        //         value: this.kycGrp.controls['panNo'].value,
        //  }); this.formData(event, KycType.PAN_CARD, this.kycGrp.controls['panNo'].value, fileUpload)
        // }
    }
    gstDetailsUpload(event: any, fileUpload: any) {
        if (this.kycGrp.controls['gstNo'].invalid) {
            this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: 'GST No Required',
            });
        }
        // else {
        //     this.onKycUpload.emit({
        //         event,
        //         type: KycType.GST_CERTIFICATE,
        //         value: this.kycGrp.controls['gstNo'].value,
        //     });
        // }
    }
    udyamUpload(event: any) {
        console.log(event);

        if (this.kycGrp.controls['udyam'].invalid) {
            this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: 'Udhym Aadhar  Number Required',
            });
        }
        //     else {
        //         this.onKycUpload.emit({
        //             event,
        //             type: KycType.UDYAM_AADHAR,
        //             value: this.kycGrp.controls['udyam'].value,
        //         });         }
    }
}
