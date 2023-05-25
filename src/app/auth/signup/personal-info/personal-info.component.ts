import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
    selector: 'app-personal-info',
    templateUrl: './personal-info.component.html',
    styleUrls: ['./personal-info.component.scss'],
})
export class PersonalInfoComponent implements OnInit {
    personalGrp: FormGroup;
    constructor(private fb: FormBuilder, private router: Router) {
        this.personalGrp = fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: [
                '',
                [
                    Validators.required,
                    Validators.pattern(
                        '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'
                    ),
                ],
            ],
            mobileNo: [
                '',
                [Validators.required, Validators.pattern('^[0-9]*$')],
            ],
            password: [
                null,
                Validators.compose([
                    Validators.required,
                    Validators.pattern(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                    ),
                    Validators.minLength(8),
                ]),
            ],
            confirmPassword: [null, [Validators.required]],
        });
    }

    ngOnInit(): void {}

    onSave() {
        this.router.navigate(['auth/otp']);
        //     try {
        //         if (this.personalGrp.invalid) {
        //             this.commanSrv.InvalidForm(this.personalGrp);
        //         } else {
        //             let user: any = this.personalGrp.value;
        //             delete user.confirmPassword;
        //             this.onSavePersonalInfo.emit(this.personalGrp.value);
        //         }
        //     } catch (error) {
        //         this.messageService.showError(error.msg);
        //     }
        console.log('this.personalGrp.value');
    }
}
