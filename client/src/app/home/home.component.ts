import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    username: string = '';
    logged: boolean = false;
    constructor(
        private chatService: ChatService
    ) { 
        this.chatService.connect();
    }

    ngOnInit(): void { }

    login(): void  {
        this.logged = true;
    }
}
