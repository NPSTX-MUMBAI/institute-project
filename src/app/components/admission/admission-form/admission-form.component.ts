import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-admission-form',
    templateUrl: './admission-form.component.html',
    styleUrls: ['./admission-form.component.scss'],
})
export class AdmissionFormComponent implements OnInit {
    items!: MenuItem[];
    index: any = 0;

    activeItem!: MenuItem;

    ngOnInit() {
        this.items = [
            { index: 0, label: 'Student Details', icon: 'pi pi-fw pi-user' },
            { index: 1, label: 'Parents Details', icon: 'pi pi-fw pi-user' },
            { index: 2, label: 'Kyc Details', icon: 'pi pi-fw pi-pencil' },
        ];

        this.activeItem = this.items[0];
    }

    onActiveItemChange(event: MenuItem) {
        console.log(event);
        this.activeItem = event;
        this.index = event.index;
    }

    activateLast() {
        this.activeItem = this.items[this.items.length - 1];
    }
}
