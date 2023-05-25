import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {

    constructor(private router: Router) {}

    route() {
        this.router.navigate(['admin-dashboard']);
    }


}
