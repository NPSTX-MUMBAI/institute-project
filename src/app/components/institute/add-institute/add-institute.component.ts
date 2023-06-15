import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/demo/service/address.service';
import {
    AddressDetails,
    PostOffice,
} from 'src/app/models/addressDetails.models';
import { InstituteService } from '../../../services/institute.service';
import { MessageService } from 'primeng/api';
import { StateService } from '../../../services/state.service';
import { InstituteInfoModel } from '../../../models/institute-info.model';

@Component({
    selector: 'app-add-institute',
    templateUrl: './add-institute.component.html',
    styleUrls: ['./add-institute.component.scss'],
})
export class AddInstituteComponent implements OnInit {
    listInstitute!: FormGroup;
    standard = [{ name: 'I' }, { name: 'II' }, { name: 'III' }];
    boards = [{ name: 'CBSE' }, { name: 'ICSE' }, { name: 'MSBSE' }];
    division = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
    schoolId: any;
    institute: any;
    items: any;
    messageService: any;
    visible: boolean = false;
    Stdvisible: boolean = false;
    index: any;
    value?: string;
    typedValue: any;
    value1?: string;
    typedValueDiv: any;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private instSvc: InstituteService,
        private route: ActivatedRoute,
        private msg: MessageService,
        private stateSvc: StateService
    ) {
        this.items = [
            {
                label: 'Users',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'New',
                        icon: 'pi pi-fw pi-user-plus',
                    },
                ],
            },
        ];
    }

    ngOnInit(): void {
        let i = 0;
        let j = 0;
        this.schoolId = this.route.snapshot.queryParamMap.get('schoolId');
        console.log(this.schoolId);

        if (this.schoolId) {
            this.fetchInstitute().then(() => {
                switch (this.institute.instituteType) {
                    case 'KG':
                        i = 0;
                        break;
                    case 'SCHOOL':
                        i = 1;
                        break;
                    case 'COACHING':
                        i = 2;
                        break;
                    case 'JrCollege':
                        i = 3;
                        break;
                    case 'UNIVERSITY':
                        i = 4;
                        break;
                }

                switch (this.institute.boardType) {
                    case 'CBSE':
                        j = 0;
                        break;
                    case 'ICSE':
                        j = 1;
                        break;
                    case 'MSBSE':
                        j = 2;
                        break;
                }

                this.listInstitute = this.fb.group({
                    instituteName: [
                        this.institute.instituteName,
                        Validators.required,
                    ],
                    instituteType: [this.dropdownItems[i], Validators.required],
                    institutePhone: [
                        this.institute.institutePhone,
                        Validators.required,
                    ],
                    instituteWebsite: [
                        this.institute.instituteWebsite,
                        Validators.required,
                    ],
                    instituteEmail: [
                        this.institute.instituteEmail,
                        Validators.required,
                    ],
                    instituteBoard: [this.boards[j], Validators.required],
                    // std: ['', Validators.required],
                    // div: ['', Validators.required],

                    spocName: ['', Validators.required],
                    spocNumber: ['', Validators.required],
                    spocEmail: ['', Validators.required],

                    line1: [this.institute.line1, Validators.required],
                    line2: [this.institute.line2, Validators.required],
                    zipcode: [this.institute.zipCode, Validators.required],
                    country: [this.institute.country, Validators.required],
                    state: [this.institute.state, Validators.required],
                    city: [this.institute.city, Validators.required],
                });
            });
        }

        this.listInstitute = this.fb.group({
            instituteName: ['', Validators.required],
            instituteType: ['', Validators.required],
            institutePhone: ['', Validators.required],
            instituteWebsite: ['', Validators.required],
            instituteEmail: ['', Validators.required],
            instituteBoard: ['', Validators.required],
            // std: ['', Validators.required],
            // div: ['', Validators.required],

            spocName: ['', Validators.required],
            spocNumber: ['', Validators.required],
            spocEmail: ['', Validators.required],

            line1: ['', Validators.required],
            line2: ['', Validators.required],
            zipcode: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],
        });
    }

    async fetchInstitute() {
        await this.instSvc
            .getInstituteDetails(this.schoolId)
            .then((res: any) => {
                const finalArray = [];

                const schoolData = {
                    ...res.data.school,
                    ...res.data.address,
                    ...res.data.board[0],
                };
                finalArray.push(schoolData);

                this.institute = finalArray[0];

                console.log(this.institute);
            });
        return true;
    }
    async submit() {
        let myUserId: any = this.stateSvc.getUserData('userId');

        // this.loading = true;
        if (this.listInstitute.invalid) {
            this.msg.add({
                severity: 'error',
                summary: 'Invalid',
                detail: 'All fields are Required',
            });
            // this.loading = false;

            return;
        }

        const myInstitute = this.listInstitute.value;
        const selectedInsType =
            this.listInstitute.get('instituteType')?.value.name;
        const selectedBoard = this.listInstitute.get('boardType')?.value.name;

        myInstitute.boardType = selectedBoard;
        myInstitute.instituteType = selectedInsType;

        const institutesAddress = {
            line1: myInstitute.line1,
            line2: myInstitute.line2,
            pinCode: myInstitute.pinCode,
            state: myInstitute.state,
            city: myInstitute.city,
            country: myInstitute.country,
        };

        console.log(myInstitute, 'check thissss');

        const instituteInfoObj: InstituteInfoModel = {
            userId: myUserId,
            instituteName: myInstitute.instituteName,
            instituteType: myInstitute.instituteType,
            institutePhone: myInstitute.institutePhone,
            instituteWebsite: myInstitute.instituteWebsite,
            instituteEmail: myInstitute.instituteEmail,
            boardType: myInstitute.boardType,

            spocName: myInstitute.spocName,
            spocEmail: myInstitute.spocEmail,
            spocNumber: myInstitute.spocNumber,
            address: institutesAddress,
        };
        console.log(instituteInfoObj, '<<<<<<<<<<<<');

        try {
            const res: any = await this.instSvc.createInstitute(
                instituteInfoObj
            );
            if (res.status) {
                this.msg.add({
                    severity: 'success',
                    summary: 'Created',
                    detail: 'Institute created successfully',
                });
                this.router.navigate(['main/institute/list']);
            } else {
                this.msg.add({
                    severity: 'warn',
                    detail: 'Please make sure your Phone number, Email id ,Website are unique ',
                });
            }
            console.log(res);
        } catch (error) {
            this.msg.add({
                severity: 'warn',
                summary: 'error',
                detail: 'Something went wrong',
            });

            console.error(error);
        }
    }

    dropdownItems = [
        { name: 'KG' },
        { name: 'SCHOOL' },
        { name: 'COACHING' },
        { name: 'JrCollege' },
        { name: 'UNIVERSITY' },
    ];
    AddInstitute() {
        this.router.navigate(['/main/institute/add']);
    }

    save(severity: string) {
        this.messageService.add({
            severity: severity,
            summary: 'Success',
            detail: 'Data Saved',
        });
    }

    onKey(value: any): void {
        this.typedValue = value;
    }

    onKeyup(value: any): void {
        this.typedValueDiv = value;
    }

    //   addStd(input: HTMLInputElement): void {
    //     console.log('hi', input);

    //    const value = input.value;
    //     if (this.standard.indexOf((value:number)=>value === -1)) {
    //       this.standard = [
    //         ...this.standard,
    //         //input.value || `New item ${this.index++}`,
    //       ];
    //     }
    //   }

    addStd(value: string): void {
        console.log(value);

        this.standard.push({ name: value });
    }

    addDiv(value: string): void {
        console.log(value);

        this.division.push({ name: value });
    }
}
