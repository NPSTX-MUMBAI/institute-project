import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-student',
    templateUrl: './list-student.component.html',
    styleUrls: ['./list-student.component.scss'],
})
export class ListStudentComponent {
    constructor(private router: Router) {}
    navigateToAddStudents() {
        this.router.navigate(['/student/add']);
    }
}
