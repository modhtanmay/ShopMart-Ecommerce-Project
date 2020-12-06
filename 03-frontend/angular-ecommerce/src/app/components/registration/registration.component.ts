import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    user = new User();
    msg = '';

    constructor(private registerService: RegistrationService, private router: Router) { }

    ngOnInit(): void {
    }

    registerUser() {
        this.registerService.registerUserFromRemote(this.user).subscribe(
            data => {
                console.log("response received");
                this.router.navigate(['/login']);
            },
            error => {
                console.log("exception occurred");
                this.msg = error.error;
            })
    }

}
