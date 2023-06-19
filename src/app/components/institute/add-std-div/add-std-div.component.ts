import { Component, OnInit } from '@angular/core';
import {
    FormGroup,
    FormControl,
    FormBuilder,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InstituteService } from '../../../services/institute.service';
import { MenuItem, MessageService } from 'primeng/api';

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
    items!: MenuItem[];

    addStdGrp!: FormGroup;
    addDivGrp!: FormGroup;
    showContainer = false;

    Stdvisible = false;
    show = false;
    index = 0;
    appendToContainer: any;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private instSvc: InstituteService,
        private msg: MessageService
    ) {
        this.items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh',
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
            },
            {
                label: 'Angular.io',
                icon: 'pi pi-info',
                url: 'http://angular.io',
            },
            { separator: true },
            { label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup'] },
        ];
    }

    ngOnInit(): void {
        this.addStdGrp = this.fb.group({
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
        console.log(this.addStdGrp.value.std);

        for (let i of this.addStdGrp.value.std) {
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

        // this.stds = this.addStdGrp.value.std;
    }
    onDropdownClick(event: Event) {
        event.preventDefault();
        if (!this.showContainer) {
            this.showContainer = true;
            this.toggleDropdown();
        }
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
                this.addDivGrp.value.div = null;
            }
        });
    }
    toggleDropdown() {
        const dropdown = this.appendToContainer.nativeElement.querySelector(
            '.p-multiselect-panel'
        );
        if (dropdown) {
            dropdown.style.display = this.showContainer ? 'block' : 'none';
        }
    }

    onPlusButtonClick() {
        this.showContainer = true;
        this.toggleDropdown();
    }
}
