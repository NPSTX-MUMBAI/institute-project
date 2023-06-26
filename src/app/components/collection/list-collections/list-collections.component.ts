import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-collections',
  templateUrl: './list-collections.component.html',
  styleUrls: ['./list-collections.component.scss']
})
export class ListCollectionsComponent {
    constructor(private router: Router){

    }


    addCollection(){


        this.router.navigate(['main/collection/add']);


    }
}
