import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    content: string;

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit(): void {
        this.userService.getPublicContent().subscribe(
            data => {
                this.content = data;
            },
            err => {
                this.content = JSON.parse(err.error).message;
            }
        );
    }

    gotoregistration() {
        this.router.navigate(['register']);
    }

}
