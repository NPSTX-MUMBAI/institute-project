import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InstituteService } from '../../../services/institute.service';
import { StateService } from '../../../services/state.service';
import { Institute } from 'src/app/models/institute.model';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-list-institute',
    templateUrl: './list-institute.component.html',
    styleUrls: ['./list-institute.component.scss'],
    providers: [ConfirmationService, DialogService],
})
export class ListInstituteComponent implements OnInit {
    value5: any;
    listInstitute!: FormGroup;
    institute!: Institute[];
    items!: MenuItem[];

    //dropdownItems=[]

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private stateSvc: StateService,
        private instSvc: InstituteService
    ) {}
    ngOnInit(): void {
        let myUser: any = this.stateSvc.getUserData('userId');
        console.log(myUser);
        this.instSvc.getInstitutesForUser(myUser).then((res: any) => {
            const finalArray = [];

            for (const item of res.data) {
                const schoolData = {
                    ...item.school,
                    ...item.address,
                };
                finalArray.push(schoolData);
            }
            this.institute = finalArray;

            console.log(this.institute);
        });
        this.listInstitute = this.fb.group({
            instituteName: ['', Validators.required],
            instituteType: ['', Validators.required],
            institutephoneno: ['', Validators.required],
            institutewebsite: ['', Validators.required],
            instituteemail: ['', Validators.required],
            instituteboard: ['', Validators.required],
            institutestd: ['', Validators.required],
            institutediv: ['', Validators.required],

            spocname: ['', Validators.required],
            spocphone: ['', Validators.required],
            spocemail: ['', Validators.required],

            address1: ['', Validators.required],
            address2: ['', Validators.required],
            zipcode: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            location: ['', Validators.required],

            instpan: ['', Validators.required],
            instregno: ['', Validators.required],
            instgstno: ['', Validators.required],
        });
    }
    submit() {
        console.log(this.listInstitute.value);
    }

    handleClick(id: any) {
        console.log(event);

        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-pencil',
                routerLink: ['/main/institute/add'],
                queryParams: { schoolId: id },
                queryParamsHandling: 'merge',
            },
            {
                label: 'Delete',
                icon: 'pi pi-trash',
                command: () => {},
            },
        ];
    }

    dropdownItems = [
        { name: 'Select Type' },
        { name: 'Bank' },
        { name: 'School' },
        { name: 'Jr School' },
    ];
    AddInstitute() {
        this.router.navigate(['/main/institute/add']);
    }
}
