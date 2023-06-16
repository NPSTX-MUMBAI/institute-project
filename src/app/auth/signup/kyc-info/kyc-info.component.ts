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
import { log } from 'console';
import { KycService } from '../../../services/kyc.service';

@Component({
    selector: 'app-kyc-info',
    templateUrl: './kyc-info.component.html',
    styleUrls: ['./kyc-info.component.scss'],
})
export class KycInfoComponent implements OnInit {
    @ViewChild('fileUpload', { static: false }) fileUpload!: FileUpload;

    @Input() kycData: any;
    @Input() aadhaarStatus = false;
    @Input() PANStatus = false;
    @Input() GSTStatus = false;
    @Input() REGStatus = false;

    @Output() onKycUpload = new EventEmitter();
    schoolId = '3133a7065cd763f64314';
    isDisabled = true;
    PANformData = new FormData();
    aadhaarformData = new FormData();
    gstformData = new FormData();
    regformData = new FormData();

    kycGrp: FormGroup;

    gstFile: any[] = [];

    panFile: any[] = [];

    udymaFile: any[] = [];
    gstDetails: any[] = [];
    regDetails: any[] = [];

    uploadedFiles!: any[];

    img1!: string;
    showIcon: boolean = true;
    showIconaadhar: boolean = true;
    showIcongst: boolean = true;
    showIconreg: boolean = true;
    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private stateSvc: StateService,
        private kycSvc: KycService
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
            reg: ['', Validators.required],
        });
    }

    index: number = 0;

    ngOnInit(): void {}

    gstDetailsUpload(event: any, fileUpload: any) {
        let mySchoolId: any = this.stateSvc.getUserData('schoolId');

        if (this.kycGrp.controls['gst'].invalid) {
            this.messageService.add({
                severity: 'info',
                detail: 'Gst Number Required',
            });
        } else {
            this.gstFile = event.files;

            this.showIcongst = false;
            this.gstformData.append('schoolId', mySchoolId.toString());
            this.gstformData.append(
                'number',
                this.kycGrp.controls['gst'].value || ''
            );
            this.gstformData.append('type', DOCUMENT_TYPE.GST || '');
            this.gstformData.append('image', event.files[0] || '');

            this.gstformData.forEach((v) => {
                console.log(v);
            });
            this.onKycUpload.emit({
                data: this.gstformData,
                event,
                type: DOCUMENT_TYPE.GST,
                value: this.kycGrp.controls['gst'].value,
            });
            // this.kycSvc.uploadKyc(this.gstformData).then((res: any) => {
            //     if (res.status) {
            //         this.messageService.add({
            //             severity: 'success',
            //             detail: 'Gst uploaded!',
            //         });
            //     }
            // });
        }
    }

    regDocUpload(event: any, fileUpload: any) {
        let mySchoolId: any = this.stateSvc.getUserData('schoolId');
        if (this.kycGrp.controls['reg'].invalid) {
            this.messageService.add({
                severity: 'info',
                detail: 'Gst Number Required',
            });
        } else {
            this.regDetails = event.files;

            this.showIconreg = false;
            this.regformData.append('schoolId', mySchoolId.toString());
            this.regformData.append(
                'number',
                this.kycGrp.controls['reg'].value || ''
            );
            this.regformData.append('type', DOCUMENT_TYPE.REG || '');
            this.regformData.append('image', event.files[0] || '');

            this.regformData.forEach((v) => {
                console.log(v);
            });

            // this.kycSvc.uploadKyc(this.regformData).then((res: any) => {
            //     if (res.status) {
            //         this.messageService.add({
            //             severity: 'success',
            //             detail: 'Reg card uploaded!',
            //         });
            //     }
            // });

            this.onKycUpload.emit({
                data: this.regformData,
                event,
                type: DOCUMENT_TYPE.REG,
                value: this.kycGrp.controls['reg'].value,
            });
        }
    }

    aadharUpload(event: any) {
        let mySchoolId: any = this.stateSvc.getUserData('schoolId');
        // console.log(event.files[0]);

        if (this.kycGrp.controls['aadhar'].invalid) {
            this.messageService.add({
                severity: 'info',
                detail: 'Aadhar  Number Required',
            });
        } else {
            this.udymaFile = event.files;

            this.showIconaadhar = false;
            this.aadhaarformData.append('schoolId', mySchoolId.toString());
            this.aadhaarformData.append(
                'number',
                this.kycGrp.controls['aadhar'].value || ''
            );
            this.aadhaarformData.append('type', DOCUMENT_TYPE.ADHARCARD || '');
            this.aadhaarformData.append('image', event.files[0] || '');

            this.aadhaarformData.forEach((v) => {
                console.log(v);
            });

            // this.kycSvc.uploadKyc(this.aadhaarformData).then((res: any) => {
            //     if (res.status) {
            //         this.messageService.add({
            //             severity: 'success',
            //             detail: 'Aadhaar card uploaded!',
            //         });
            //     }
            // });

            this.onKycUpload.emit({
                data: this.aadhaarformData,

                event,
                type: DOCUMENT_TYPE.ADHARCARD,
                value: this.kycGrp.controls['aadhar'].value,
            });
        }
    }

    panDetailsUpload(event: any, fileUpload: any) {
        let mySchoolId: any = this.stateSvc.getUserData('schoolId');

        console.log(event);

        if (this.kycGrp.controls['panNo'].invalid) {
            this.messageService.add({
                severity: 'info',
                detail: 'Pan Card Number Required',
            });
        } else {
            this.panFile = event.files;

            this.showIcon = false;

            this.PANformData.append('schoolId', mySchoolId.toString());
            this.PANformData.append(
                'number',
                this.kycGrp.controls['panNo'].value || ''
            );
            this.PANformData.append('type', DOCUMENT_TYPE.PANCARD || '');
            this.PANformData.append('image', event.files[0] || '');

            this.PANformData.forEach((v) => {
                console.log(v);
            });

            this.onKycUpload.emit({
                data: this.PANformData,
                event,
                type: DOCUMENT_TYPE.PANCARD,
                value: this.kycGrp.controls['panNo'].value,
                schoolId: mySchoolId,
            });
        }
    }
    submit() {
        console.log();

        console.log(this.kycGrp.value.panFile);
        console.log(this.panFile, this.udymaFile);
    }
}
