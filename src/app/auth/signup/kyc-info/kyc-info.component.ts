import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    FormControl,
    Validators,
} from '@angular/forms';
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { MessageService } from 'primeng/api';

import { FileUpload } from 'primeng/fileupload';
import { DOCUMENT_TYPE } from 'src/app/models/admission.model';
import { StateService } from 'src/app/services/state.service';

@Component({
    selector: 'app-kyc-info',
    templateUrl: './kyc-info.component.html',
    styleUrls: ['./kyc-info.component.scss'],
})
export class KycInfoComponent implements OnInit {
    @ViewChild('fileUpload', { static: false }) fileUpload!: FileUpload;

    @Input() kycData: any;

    @Output() onKycUpload = new EventEmitter();
    applicationId: any = this.stateSrv.applicationId;
    isDisabled = true;

    kycGrp: FormGroup;

    gstFile: any[] = [];

    panFile: any[] = [];

    udymaFile: any[] = [];
    gstDetails: any[] = [];
    regDetails: any[] = [];

    uploadedFiles!: any[];

    img1!: string;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private stateSrv: StateService
    ) {
        this.kycGrp = fb.group({
            panNo: [
                '',
                [
                    Validators.required,
                    Validators.minLength(10),
                    Validators.maxLength(10),
                ],
            ],
            aadhar: ['', Validators.required],
            gst: ['', Validators.required],
        });
    }

    index: number = 0;

    ngOnInit(): void {}

    // ngOnChanges(change: any) {
    //     let data = change.kycData.currentValue;

    //     if (data != null && data.length != 0) {
    //         for (let i = 0; i < data.length; i++) {
    //             this.convertFile(data[i]);
    //         }
    //     }
    // }

    // convertFile(data: any) {
    //     let image = data.imageUrl.split('.');

    //     let fileName = image[image.length - 1];

    //     fetch(data.imageUrl).then(async (response: any) => {
    //         const blob = await response.blob();

    //         const file = new File([blob], fileName, { type: blob.type });

    //         if (data.type == DOCUMENT_TYPE.PANCARD) {
    //             this.kycGrp.controls['panNo'].patchValue(data.number); // this.fileUpload.files = [file]

    //             this.panFile = [file];
    //         }

    //         if (data.type == DOCUMENT_TYPE.ADHARCARD) {
    //             this.kycGrp.controls['aadhar'].patchValue(data.number);

    //             this.udymaFile = [file];
    //         }
    //     });
    // }

    gstDetailsUpload(event: any, fileUpload: any) {
        if (this.kycGrp.controls['gst'].invalid) {
            this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: 'gst Number Required',
            });
        } else {
            this.onKycUpload.emit({
                event,
                type: DOCUMENT_TYPE.GST,
                value: this.kycGrp.controls['gst'].value,
            });
        }
    }

    regDocUpload(event: any, fileUpload: any) {
        if (this.kycGrp.controls['reg'].invalid) {
            this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: 'gst Number Required',
            });
        } else {
            this.onKycUpload.emit({
                event,
                type: DOCUMENT_TYPE.REG,
                value: this.kycGrp.controls['reg'].value,
            });
        }
    }

    aadharUpload(event: any) {
        // console.log(event.files[0]);

        if (this.kycGrp.controls['aadhar'].invalid) {
            this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: 'Aadhar  Number Required',
            });
        } else {
            this.onKycUpload.emit({
                event,
                type: DOCUMENT_TYPE.ADHARCARD,
                value: this.kycGrp.controls['aadhar'].value,
            });
        }
    }

    panDetailsUpload(event: any, fileUpload: any) {
        console.log(event);

        if (this.kycGrp.controls['panNo'].invalid) {
            this.messageService.add({
                severity: 'info',
                summary: 'Info',
                detail: 'Pan Card Number Required',
            });
        } else {
            this.onKycUpload.emit({
                event,
                type: DOCUMENT_TYPE.PANCARD,
                value: this.kycGrp.controls['panNo'].value,
                applicationId: this.applicationId,
            });
        }
    }
    submit() {
        console.log();

        console.log(this.kycGrp.value.panFile);
        console.log(this.panFile, this.udymaFile);
    }
}
