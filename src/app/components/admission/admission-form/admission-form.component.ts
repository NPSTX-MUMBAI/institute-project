import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { MenuItem } from 'primeng/api';
import { DOCUMENT_TYPE } from 'src/app/models/admission.model';
import { AdmissionService } from 'src/app/services/admission.service';
import { StateService } from 'src/app/services/state.service';

@Component({
    selector: 'app-admission-form',
    templateUrl: './admission-form.component.html',
    styleUrls: ['./admission-form.component.scss'],
})
export class AdmissionFormComponent implements OnInit {
    items!: MenuItem[];
    index: any = 0;

    activeItem!: MenuItem;

    constructor(
        private admissionSrv: AdmissionService,
        private statesrv: StateService
    ) {}

    ngOnInit() {
        this.items = [
            { index: 0, label: 'Student Details', icon: 'pi pi-fw pi-user' },
            { index: 1, label: 'Parents Details', icon: 'pi pi-fw pi-user' },
            { index: 2, label: 'Kyc Details', icon: 'pi pi-fw pi-pencil' },
        ];

        this.activeItem = this.items[0];
    }

    private formData(event: any, kycType: string, value: string) {
        // let businessId = this.authservice.getBusinessId();
        let applicationId = this.statesrv.applicationId;
        var formData: any = new FormData();

        formData.append('image', event.event.files[0]);

        formData.append('type', kycType);

        formData.append('number', value.toUpperCase());

        formData.append('applicationId', applicationId);

        this.admissionSrv
            .uploadKyc(formData)
            .then((res: any) => {
                console.log(res);

                // if (res.data.type == DOCUMENT_TYPE.PANCARD) {

                // }
                // if (res.data.type == DOCUMENT_TYPE.ADHARCARD) {
                // }

                // this.messageService.showSuccess(res.msg);
            })
            .catch((err) => {
                console.log(err);

                // this.messageService.showError(err.msg);
            });
    }

    onActiveItemChange(event: MenuItem) {
        console.log(event);
        this.activeItem = event;
        this.index = event.index;
    }

    activateLast() {
        this.activeItem = this.items[this.items.length - 1];
    }

    onKycUpload(event: any) {
        this.formData(event, event.type, event.value);
        console.log(event);
    }
}
