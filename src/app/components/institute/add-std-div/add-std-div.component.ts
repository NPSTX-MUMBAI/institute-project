import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InstituteService } from '../../../services/institute.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-add-std-div',
    templateUrl: './add-std-div.component.html',
    styleUrls: ['./add-std-div.component.scss'],
})
export class AddStdDivComponent implements OnInit {
    standards = [
        { name: 'I' },
        { name: 'II' },
        { name: 'III' },
        { name: 'IV' },
        { name: 'V' },
        { name: 'VI' },
        { name: 'VII' },
        { name: 'VIII' },
        { name: 'IX' },
        { name: 'X' },
        { name: 'XI' },
        { name: 'XII' },
    ];
    divisions = [{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }];

    stds = [];

    schoolId: any;

    addStdDiv!: FormGroup;
    addDivGrp!: FormGroup;

    Stdvisible = false;
    show = false;
    index = 0;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private instSvc: InstituteService,
        private msg: MessageService
    ) {}

    ngOnInit(): void {
        this.addStdDiv = this.fb.group({
            std: ['', Validators.required],
        });
        this.addDivGrp = this.fb.group({
            div: ['', Validators.required],
        });
    }

    addStd(value: any): void {
        this.standards.unshift({ name: value });
    }

    onKey() {
        this.Stdvisible = true;
    }
    async submit() {
        let finalArray = [];

        this.schoolId = this.route.snapshot.queryParamMap.get('schoolId');
        console.log(this.addStdDiv.value.std);

        for (let i of this.addStdDiv.value.std) {
            finalArray.push(i.name);
        }

        let data = {
            schoolId: this.schoolId,
            std: finalArray,
        };
        console.log(data);

        await this.instSvc.addStd(data).then((res: any) => {
            console.log(res);
            if (res.status) {
                this.msg.add({
                    severity: 'success',
                    summary: 'created',
                    detail: `Added selected standards in your school`,
                });
                this.getAllStd();
            }
        });

        // this.stds = this.addStdDiv.value.std;
    }

    async getAllStd() {
        this.show = true;
        await this.instSvc.getAllStds(this.schoolId).then((res: any) => {
            this.stds = res.data;
        });
    }

    addDiv(id: any) {
        console.log(id, '<<<>>>', this.addDivGrp.value.div);

        let finalArray = [];

        console.log(this.addDivGrp.value.div);

        for (let i of this.addDivGrp.value.div) {
            finalArray.push(i.name);
        }

        let data = {
            standardId: id,
            div: finalArray,
        };
        console.log(data);

        this.instSvc.addDiv(data).then((res: any) => {
            if (res.status) {
                this.msg.add({
                    severity: 'success',
                    summary: 'created',
                    detail: `Added selected divisions in your school`,
                });
            }
        });
    }
}
