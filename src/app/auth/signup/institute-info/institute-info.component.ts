import { Component, OnInit } from '@angular/core';
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

@Component({
    selector: 'app-institute-info',
    templateUrl: './institute-info.component.html',
    styleUrls: ['./institute-info.component.scss'],
})
export class InstituteInfoComponent implements OnInit {
    InstituteInfo!: FormGroup;

    board!: Board[];
    newBoardName: any;
    selectedBoard!: Board;
    //dropdownItems=[]

    constructor(private fb: FormBuilder, private msg: MessageService) {
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
            board: ['', Validators.required],
        });
    }
    submit() {
        if (this.InstituteInfo.invalid) {
            this.msg.add({
                severity: 'error',
                summary: 'Invalid',
                detail: 'All fileds Required',
            });
            return;
        }
        console.log(this.InstituteInfo.value);
        const data = this.InstituteInfo.value;
        const instituteInfoObj: InstituteInfoModel = {
            instituteName: data.instituteName,
            instituteType: data.instituteType,
            institutePhone: data.institutePhone,
            instituteWebsite: data.instituteWebsite,
            instituteEmail: data.instituteEmail,
            board: data.board,
            address: data.address,
        };
        console.log(instituteInfoObj);
    }

    dropdownItems = [
        { name: 'Select Type' },
        { name: 'Bank' },
        { name: 'School' },
        { name: 'Jr School' },
    ];

    addBoard(board: any) {
        console.log(board);
        this.newBoardName = this.InstituteInfo.get('newBoard');
        // Create a new board object using the value from the input box
        const newBoard = { name: this.newBoardName };

        // Add the new board to the list of boards
        this.board.push(newBoard);
        console.log(this.board);

        // Reset the input box value
        // this.newBoardName = '';
    }

    onKeyUp() {
        console.log('object');
    }
}
