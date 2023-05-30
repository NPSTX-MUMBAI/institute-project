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

    constructor(private fb: FormBuilder) {
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
        console.log(this.InstituteInfo.value);
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
