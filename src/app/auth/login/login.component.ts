import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginGrp!: FormGroup;

    constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) {}

    ngOnInit(): void {
        this.loginGrp = this.fb.group({
            mobileNo: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    route() {
        this.router.navigate(['auth/signup']);
        localStorage.clear();
    }

    signin() {
        console.log(this.loginGrp.value);



        
        // this.router.navigate(['admin-dashboard']);
    }
}
