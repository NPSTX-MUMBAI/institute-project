import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';

interface Board {
    name: string;
}
import { MessageService } from 'primeng/api';

import { InstituteInfoModel } from 'src/app/models/institute-info.model';
import { state } from '@angular/animations';
import { InstituteService } from '../../../services/institute.service';
import { StateService } from '../../../services/state.service';

@Component({
    selector: 'app-institute-info',
    templateUrl: './institute-info.component.html',
    styleUrls: ['./institute-info.component.scss'],
})
export class InstituteInfoComponent implements OnInit {
    @Output() onSaveInstInfo = new EventEmitter();

    InstituteInfo!: FormGroup;

    board!: Board[];
    // newBoardName: any;

    selectedBoard!: Board;
    loading = false;

    constructor(
        private fb: FormBuilder,
        private msg: MessageService,
        private instSvc: InstituteService,
        private stateSvc: StateService
    ) {
        this.board = [{ name: 'CBSE' }, { name: 'ICSE' }, { name: 'MSBE' }];
    }
    ngOnInit(): void {
        this.InstituteInfo = this.fb.group({
            instituteName: ['', Validators.required],
            instituteType: ['', Validators.required],
            institutePhone: ['', Validators.required],
            instituteWebsite: ['', Validators.required],
            instituteEmail: ['', Validators.required],
            line1: ['', Validators.required],
            line2: ['', Validators.required],
            pinCode: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],
            boardType: ['', Validators.required],
        });
    }
    async submit() {
        let myUserId: any = this.stateSvc.getUserData('userId');

        this.loading = true;
        if (this.InstituteInfo.invalid) {
            this.msg.add({
                severity: 'error',
                summary: 'Invalid',
                detail: 'All fields are Required',
            });
            this.loading = false;

            return;
        }

        const myInstitute = this.InstituteInfo.value;
        const selectedInsType =
            this.InstituteInfo.get('instituteType')?.value.name;
        const selectedBoard = this.InstituteInfo.get('boardType')?.value.name;

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
            address: institutesAddress,
        };
        console.log(instituteInfoObj, '<<<<<<<<<<<<');

        if (instituteInfoObj) {
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

                    this.loading = false;
                    this.onSaveInstInfo.emit(instituteInfoObj);

                    this.stateSvc.setUserData('schoolId', res.data.schoolId);
                } else {
                    this.msg.add({
                        severity: 'warn',
                        summary: 'error',
                        detail: 'Something went wrong',
                    });
                    this.loading = false;
                }
                console.log(res);
            } catch (error) {
                this.msg.add({
                    severity: 'warn',
                    summary: 'error',
                    detail: 'Something went wrong',
                });
                this.loading = false;

                console.error(error);
            }
        }
    }

    instituteTypes = [
        { name: 'Bank' },
        { name: 'School' },
        { name: 'Jr School' },
    ];

    // addBoard(board: any) {
    //     console.log(board);
    //     this.newBoardName = this.InstituteInfo.get('newBoard');
    //     // Create a new board object using the value from the input box
    //     const newBoard = { name: this.newBoardName };

    //     // Add the new board to the list of boards
    //     this.board.push(newBoard);
    //     console.log(this.board);

    //     // Reset the input box value
    //     // this.newBoardName = '';
    // }

    onKeyUp() {
        console.log('object');
    }
}
