import { Component, OnInit } from '@angular/core';
import { ChatService } from '../_services/chat.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    name: string = '';
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
