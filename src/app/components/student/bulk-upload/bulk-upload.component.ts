import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { StateService } from '../../../services/state.service';
import { StudentService } from '../../../services/student.service';
import { Router } from '@angular/router';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'app-bulk-upload',
    templateUrl: './bulk-upload.component.html',
    styleUrls: ['./bulk-upload.component.scss'],
    providers: [MessageService],
})
export class BulkUploadComponent implements OnInit {
    uploadedFiles: any[] = [];

    studentBulk = new FormData();
    schoolId: any;

    constructor(
        private messageService: MessageService,
        private stateSvc: StateService,
        private studSvc: StudentService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.schoolId = this.stateSvc.getUserData('schoolId');
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
}
