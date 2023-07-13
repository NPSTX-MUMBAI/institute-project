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
import * as XLSX from 'xlsx';

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
    showNotification: boolean = false;
    studentBulk = new FormData();
    schoolId: any;
    position: string = 'top';
    visible = false;
    data: any[] = [];

    resultdata: any[] = [];
    newData: any[] = [];
    value = 0;

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
                    this.value = 100;

                    // this.router.navigate(['main/student']);
                } else {
                    this.messageService.add({
                        severity: 'warn',
                        summary: 'Data exists!',
                        detail: 'uniqueId is present aleady',
                    });
                    this.showNotification = false;
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
    onSelect(evt: any) {
        console.log(evt);

        this.visible = true;
        const target: DataTransfer = <DataTransfer>evt.originalEvent.target;
        if (target.files.length !== 1)
            throw new Error('Cannot upload more than 1 file');

        const reader: FileReader = new FileReader();

        reader.onload = (e: any) => {
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            this.data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as [];

            let filterHeader = this.data[0];

            let studentData = [];

            this.data.forEach((el: any, idx: number) => {
                if (idx == 0) return;
                let temp = el.reduce(function (
                    result: any,
                    field: any,
                    index: any
                ) {
                    result[filterHeader[index]] = field;
                    return result;
                },
                {});
                if (temp !== undefined && temp !== null) {
                    this.resultdata.push(temp);
                }

                //*********** */
            });
            console.log(this.resultdata);
            console.log(this.data);

            const keys = this.data[0];

            for (let i = 1; i < this.data.length; i++) {
                const row = this.data[i];
                const obj: any = {};

                for (let j = 0; j < keys.length; j++) {
                    const key = keys[j];
                    obj[key] = row[j];
                }

                this.newData.push(obj);
            }

            console.log(this.newData);
        };
        reader.readAsBinaryString(target.files[0]);
    }

    showDialog() {
        this.visible = true;
    }
    notification() {
        this.showNotification = true;

        const notifications = [
            { delay: 1000, value: 33 },
            { delay: 2000, value: 66 },
            { delay: 3000, value: 99 },
        ];

        let i = 0;
        while (i < notifications.length) {
            const notification = notifications[i];
            setTimeout(() => {
                this.value = notification.value;
            }, notification.delay);
            i++;
        }
        setTimeout(() => {
            this.hideNotification();
        }, 5000);
    }
    hideNotification() {
        this.showNotification = false;
    }

    cross() {
        console.log('shivaniiiiiiiiiiiiii');

        this.showNotification = false;
    }
    navigateToRoute() {
        this.router.navigateByUrl('/main/student');
    }
}
