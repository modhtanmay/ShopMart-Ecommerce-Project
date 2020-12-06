import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
    selector: 'app-register-jwt',
    templateUrl: './register-jwt.component.html',
    styleUrls: ['./register-jwt.component.css']
})
export class RegisterJwtComponent implements OnInit {

    form: any = {};
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.authService.register(this.form).subscribe(
            data => {
                console.log(data);
                this.isSuccessful = true;
                this.isSignUpFailed = false;
            },
            err => {
                this.errorMessage = err.error.message;
                this.isSignUpFailed = true;
            }
        );
    }
}
