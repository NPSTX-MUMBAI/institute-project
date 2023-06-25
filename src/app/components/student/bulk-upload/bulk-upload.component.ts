import { Component, OnInit } from '@angular/core';
import {
    ConfirmEventType,
    ConfirmationService,
    MessageService,
} from 'primeng/api';
import { StateService } from '../../../services/state.service';
import { StudentService } from '../../../services/student.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'app-bulk-upload',
    templateUrl: './bulk-upload.component.html',
    styleUrls: ['./bulk-upload.component.scss'],
    providers: [ConfirmationService, MessageService, DialogService],
})
export class BulkUploadComponent implements OnInit {
    uploadedFiles: any[] = [];

    studentBulk = new FormData();
    schoolId: any;
    position: string = 'top';
    location = 'here';
    constructor(
        private messageService: MessageService,
        private stateSvc: StateService,
        private studSvc: StudentService,
        private router: Router,
        private confirmationService: ConfirmationService,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.schoolId = this.stateSvc.getUserData('schoolId');

        this.showPopup();
    }

    onUpload(event: UploadEvent) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);

            this.studentBulk.append('schoolId', this.schoolId.toString());
            this.studentBulk.append('uniqueId', '34');

            this.studentBulk.append('file', event.files[0] || '');

            this.studentBulk.forEach((v) => {
                console.log(v);
            });

            this.studSvc.bulkUpload(this.studentBulk).then((res: any) => {
                console.log(res);

                if (res.status) {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'File Uploaded',
                        detail: '',
                    });

                    this.router.navigate(['main/student']);
                } else {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Data exists!',
                        detail: 'uniqueId is present aleady',
                    });
                }
            });

            console.log(this.uploadedFiles);
        }
    }
    showPopup() {

        this.confirmationService.confirm({
            message: `You are expected to have an Excel file in the proper format to upload the list of students. If you don't have it yet, you can download it now.`,
            header: 'Student Bulk Upload',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.downloadExcelFile();
                this.messageService.add({
                    severity: 'info',
                    summary: 'Downloading',
                    detail: 'File Downloaded',
                });
            },
            reject: (type: ConfirmEventType) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Rejected',
                            detail: 'Looks like you already have the file',
                        });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({
                            severity: 'warn',
                            summary: 'Cancelled',
                            detail: 'Looks like you already have the file',
                        });
                        break;
                }
            },
            key: 'positionDialog',
        });
    }

    onSelect(event:any){
        console.log(event)
        
    }

    downloadExcelFile() {
        const filePath = 'assets/UploadSample.csv';
        const fileName = 'UploadSample.csv';

        this.http.get(filePath, { responseType: 'blob' }).subscribe(
            (response: Blob) => {
                const url = window.URL.createObjectURL(response);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                link.click();
                window.URL.revokeObjectURL(url);
            },
            (error) => {
                console.error('Error downloading the file:', error);
            }
        );
    }
}
