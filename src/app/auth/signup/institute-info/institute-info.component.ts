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
    listInstitute!: FormGroup;

    board!: Board[];
    newBoardName: any;

    selectedBoard!: Board;
    //dropdownItems=[]

    constructor(private fb: FormBuilder) {
        this.board = [{ name: 'CBSE' }, { name: 'ICSE' }, { name: 'MSBE' }];
    }
    ngOnInit(): void {
        this.listInstitute = this.fb.group({
            instituteName: ['', Validators.required],
            instituteType: ['', Validators.required],
            institutephoneno: ['', Validators.required],
            institutewebsite: ['', Validators.required],
            instituteemail: ['', Validators.required],
            instituteboard: ['', Validators.required],
            address1: ['', Validators.required],
            address2: ['', Validators.required],
            pincode: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],
            newBoard: [''],
            location: ['', Validators.required],
        });
    }
    submit() {
        console.log(this.listInstitute.value);
    }

    dropdownItems = [
        { name: 'Select Type' },
        { name: 'Bank' },
        { name: 'School' },
        { name: 'Jr School' },
    ];

    addBoard() {
        this.newBoardName = this.listInstitute.get('newBoard');
        // Create a new board object using the value from the input box
        const newBoard = { name: this.newBoardName };

        // Add the new board to the list of boards
        this.board.push(newBoard);
        console.log(this.board);

        // Reset the input box value
        // this.newBoardName = '';
    }
}
