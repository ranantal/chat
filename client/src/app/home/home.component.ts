import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    username: string = '';
    logged: boolean = false;
    constructor() { 

    }

    ngOnInit(): void { }

    login(): void  {
        this.logged = true;
    }
}
