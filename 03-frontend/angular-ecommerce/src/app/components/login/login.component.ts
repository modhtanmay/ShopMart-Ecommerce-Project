import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    user = new User();
    errMsg = '';

    constructor(private registerService: RegistrationService, private router: Router) { }

    ngOnInit(): void {
    }

    loginUser() {
        this.registerService.loginUserFromRemote(this.user).subscribe(
            data => {
                console.log("response received"),
                    this.router.navigate(['/products']);

            },
            error => {
                console.log("exception occured");
                this.errMsg = 'Bad Credentials, please enter valid username and password';
            });
    }

    gotoregistration() {
        this.router.navigate(['/register']);
    }

}
